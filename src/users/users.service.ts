import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateAvailabilityDto } from './dtos/update-availability.dto';
import { AddUserSkillDto } from './dtos/add-user-skill.dto';
import { UpdateUserSkillDto } from './dtos/update-user-skill.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.userSkill.create({
      data: {
        userId,
        skillId: dto.skillId,
        level: dto.level,
      },
    });
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
}

