import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobStatus, NotificationType } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
  ) {}

  async createJob(recruiterId: number, dto: CreateJobDto) {
    const job = await this.prisma.job.create({
      data: {
        title: dto.title,
        description: dto.description,
        location: dto.location,
        employment_type: dto.employment_type,
        createdById: recruiterId,
        skillId: dto.skillId,
      },
    });
    if (dto.skillId) {
      const users = await this.prisma.user.findMany({
        where: {
          userSkills: {
            some: {
              skillId: dto.skillId,
            },
          },
        },
        include: {
          userSkills: {
            where: { skillId: dto.skillId },
            include: { skill: true },
          },
        },
      });
      for (const user of users) {
        const skillName = user.userSkills[0]?.skill?.name ?? 'your skill';
        await this.notificationsService.createNotification(
          user.id,
          NotificationType.NEW_JOB_FOR_SKILL,
          'New job for your skill',
          `A new job "${job.title}" matches your skill ${skillName}.`,
          { jobId: job.id },
        );
        const emailAllowed =
          await this.notificationsService.isEmailEnabled(user.id);
        if (emailAllowed) {
          await this.emailService.sendNewJobForSkillEmail(
            user.email,
            skillName,
            job.title,
          );
        }
      }
    }
    return job;
  }

  getPublicJobs(params: {
    skillId?: number;
    location?: string;
    employment_type?: string;
  }) {
    const { skillId, location, employment_type } = params;
    return this.prisma.job.findMany({
      where: {
        status: JobStatus.open,
        skillId: skillId,
        location: location ? { contains: location, mode: 'insensitive' } : undefined,
        employment_type: employment_type as any,
      },
      include: {
        skill: true,
        created_by: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getJobById(id: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        skill: true,
        created_by: true,
      },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  getMyJobs(recruiterId: number) {
    return this.prisma.job.findMany({
      where: {
        createdById: recruiterId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async updateJob(recruiterId: number, jobId: number, dto: UpdateJobDto) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (job.createdById !== recruiterId) {
      throw new ForbiddenException('You can only update your own jobs');
    }
    return this.prisma.job.update({
      where: { id: jobId },
      data: {
        title: dto.title ?? job.title,
        description: dto.description ?? job.description,
        location: dto.location ?? job.location,
        employment_type: dto.employment_type ?? job.employment_type,
        status: dto.status ?? job.status,
        skillId: dto.skillId ?? job.skillId,
      },
    });
  }

  async deleteJob(recruiterId: number, jobId: number) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (job.createdById !== recruiterId) {
      throw new ForbiddenException('You can only delete your own jobs');
    }
    await this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: JobStatus.closed,
      },
    });
    return { message: 'Job closed' };
  }
}

