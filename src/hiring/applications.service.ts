import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationStatus, JobStatus, NotificationType } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
  ) {}

  async applyToJob(
    candidateId: number,
    jobId: number,
    coverLetter?: string,
    cvUrl?: string,
  ) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job || job.status !== JobStatus.open) {
      throw new NotFoundException('Job not found or not open');
    }

    const existing = await this.prisma.jobApplication.findFirst({
      where: { jobId, candidateId },
    });
    if (existing) {
      return existing;
    }

    const application = await this.prisma.jobApplication.create({
      data: {
        jobId,
        candidateId,
        cover_letter: coverLetter,
        cv_url: cvUrl,
      },
    });
    const candidate = await this.prisma.user.findUnique({
      where: { id: candidateId },
    });
    if (candidate) {
      await this.notificationsService.createNotification(
        candidate.id,
        NotificationType.JOB_APPLIED,
        'Application submitted',
        `You applied for ${job.title}.`,
        { jobId: job.id },
      );
      const emailAllowed =
        await this.notificationsService.isEmailEnabled(candidate.id);
      if (emailAllowed) {
        await this.emailService.sendJobApplicationReceivedEmail(
          candidate.email,
          job.title,
        );
      }
    }

    return application;
  }

  async getJobApplications(recruiterId: number, jobId: number) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job || job.createdById !== recruiterId) {
      throw new ForbiddenException('You can only view applications for your own jobs');
    }

    return this.prisma.jobApplication.findMany({
      where: { jobId },
      include: {
        candidate: {
          include: {
            userSkills: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async updateApplicationStatus(
    recruiterId: number,
    applicationId: number,
    status: ApplicationStatus,
  ) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (application.job.createdById !== recruiterId) {
      throw new ForbiddenException('You can only update applications for your own jobs');
    }

    const updated = await this.prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status },
    });

    const candidate = await this.prisma.user.findUnique({
      where: { id: application.candidateId },
    });
    if (candidate) {
      await this.notificationsService.createNotification(
        candidate.id,
        NotificationType.JOB_STATUS_CHANGED,
        'Application status updated',
        `Your application for ${application.job.title} is now ${status}.`,
        { jobId: application.job.id, status },
      );
      const emailAllowed =
        await this.notificationsService.isEmailEnabled(candidate.id);
      if (emailAllowed) {
        await this.emailService.sendJobStatusChangedEmail(
          candidate.email,
          application.job.title,
          status,
        );
      }
    }

    return updated;
  }

  getMyApplications(candidateId: number) {
    return this.prisma.jobApplication.findMany({
      where: { candidateId },
      include: {
        job: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}

