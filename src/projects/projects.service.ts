import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@prisma/client';
import { EmailService } from '../email/email.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
  ) {}

  createProject(ownerId: number, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        createdById: ownerId,
        skillId: dto.skillId,
        members: {
          create: {
            userId: ownerId,
            role: 'admin',
          },
        },
      },
    });
  }

  getProjects() {
    return this.prisma.project.findMany({
      include: {
        created_by: true,
        skill: true,
      },
    });
  }

  async getProjectById(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        created_by: true,
        skill: true,
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async updateProject(userId: number, projectId: number, dto: UpdateProjectDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    if (project.createdById !== userId) {
      throw new ForbiddenException('Only owner can update project');
    }
    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
      },
    });
  }

  async deleteProject(userId: number, projectId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    if (project.createdById !== userId) {
      throw new ForbiddenException('Only owner can delete project');
    }
    await this.prisma.project.delete({ where: { id: projectId } });
    return { message: 'Project deleted' };
  }

  async joinProject(userId: number, projectId: number) {
    const existing = await this.prisma.projectMember.findFirst({
      where: { projectId, userId },
    });
    if (!existing) {
      await this.prisma.projectMember.create({
        data: { projectId, userId },
      });
    }
    return { message: 'Joined project' };
  }

  async inviteToProject(projectId: number, inviterId: number, inviteeId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project || project.createdById !== inviterId) {
      throw new ForbiddenException('Only owner can invite');
    }
    const existing = await this.prisma.projectMember.findFirst({
      where: { projectId, userId: inviteeId },
    });
    if (!existing) {
      await this.prisma.projectMember.create({
        data: { projectId, userId: inviteeId },
      });
    }
    return { message: 'User invited to project' };
  }

  getMembers(projectId: number) {
    return this.prisma.projectMember.findMany({
      where: { projectId },
      include: {
        user: true,
      },
    });
  }

  async addComment(userId: number, projectId: number, dto: CreateCommentDto) {
    const comment = await this.prisma.projectComment.create({
      data: {
        projectId,
        userId,
        content: dto.content,
      },
    });
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { created_by: true },
    });
    if (project) {
      await this.notificationsService.createNotification(
        project.createdById,
        NotificationType.COMMENT_RECEIVED,
        'New comment on your project',
        `Your project "${project.title}" received a new comment.`,
        { projectId },
      );
      const emailAllowed =
        await this.notificationsService.isEmailEnabled(project.createdById);
      if (emailAllowed) {
        await this.emailService.sendCommentReceivedEmail(
          project.created_by.email,
          project.title,
        );
      }
    }
    return comment;
  }

  getComments(projectId: number) {
    return this.prisma.projectComment.findMany({
      where: { projectId },
      include: {
        user: true,
      },
    });
  }
}

