import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateAvailabilityDto } from './dtos/update-availability.dto';
import { AddUserSkillDto } from './dtos/add-user-skill.dto';
import { UpdateUserSkillDto } from './dtos/update-user-skill.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@prisma/client';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
  ) { }

  async getTalentList() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        availability_status: true,
        role: true,
      },
      where: {
        is_verified: true,
      },
    });
  }

  async getTalentById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        availability_status: true,
        role: true,
        created_at: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: dto.name,
        avatar: dto.avatar,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        availability_status: true,
        role: true,
      },
    });
  }

  async updateAvailability(requestingUserId: number, targetUserId: number, dto: UpdateAvailabilityDto) {
    if (requestingUserId !== targetUserId) {
      throw new ForbiddenException('You can only update your own availability');
    }
    return this.prisma.user.update({
      where: { id: targetUserId },
      data: {
        availability_status: dto.availability_status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        availability_status: true,
      },
    });
  }

  async updateAvatar(userId: number, targetUserId: number, avatarUrl: string) {
    if (userId !== targetUserId) {
      throw new ForbiddenException('You can only update your own avatar');
    }

    return this.prisma.user.update({
      where: { id: targetUserId },
      data: {
        avatar: avatarUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        availability_status: true,
        role: true,
      },
    });
  }

  async addUserSkill(userId: number, dto: AddUserSkillDto) {
    const userSkill = await this.prisma.userSkill.create({
      data: {
        userId,
        skillId: dto.skillId,
        level: dto.level,
      },
    });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const skill = await this.prisma.skill.findUnique({ where: { id: dto.skillId } });
    if (user && skill) {
      await this.notificationsService.createNotification(
        user.id,
        NotificationType.SKILL_ADDED,
        'New skill added',
        `You added the skill ${skill.name}.`,
        { skillId: skill.id },
      );
      const emailAllowed =
        await this.notificationsService.isEmailEnabled(user.id);
      if (emailAllowed) {
        await this.emailService.sendSkillAddedEmail(user.email, skill.name);
      }
    }
    return userSkill;
  }

  getUserSkills(userId: number) {
    return this.prisma.userSkill.findMany({
      where: { userId },
      include: {
        skill: true,
      },
    });
  }

  async updateUserSkill(userId: number, skillId: number, dto: UpdateUserSkillDto) {
    const existing = await this.prisma.userSkill.findFirst({
      where: { userId, skillId },
    });
    if (!existing) {
      throw new NotFoundException('User skill not found');
    }

    return this.prisma.userSkill.update({
      where: { id: existing.id },
      data: {
        level: dto.level,
      },
    });
  }

  async deleteUserSkill(userId: number, skillId: number) {
    const existing = await this.prisma.userSkill.findFirst({
      where: { userId, skillId },
    });
    if (existing) {
      await this.prisma.userSkill.delete({
        where: { id: existing.id },
      });
    }
    return { message: 'User skill removed' };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    // Get user with password
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    // Update password
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return { message: 'Password changed successfully' };
  }
}

