"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
const email_service_1 = require("../email/email.service");
let ApplicationsService = class ApplicationsService {
    constructor(prisma, notificationsService, emailService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
    }
    async applyToJob(candidateId, jobId, coverLetter, cvUrl) {
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job || job.status !== client_1.JobStatus.open) {
            throw new common_1.NotFoundException('Job not found or not open');
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
            await this.notificationsService.createNotification(candidate.id, client_1.NotificationType.JOB_APPLIED, 'Application submitted', `You applied for ${job.title}.`, { jobId: job.id });
            const emailAllowed = await this.notificationsService.isEmailEnabled(candidate.id);
            if (emailAllowed) {
                await this.emailService.sendJobApplicationReceivedEmail(candidate.email, job.title);
            }
        }
        return application;
    }
    async getJobApplications(recruiterId, jobId) {
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job || job.createdById !== recruiterId) {
            throw new common_1.ForbiddenException('You can only view applications for your own jobs');
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
    async updateApplicationStatus(recruiterId, applicationId, status) {
        const application = await this.prisma.jobApplication.findUnique({
            where: { id: applicationId },
            include: { job: true },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (application.job.createdById !== recruiterId) {
            throw new common_1.ForbiddenException('You can only update applications for your own jobs');
        }
        const updated = await this.prisma.jobApplication.update({
            where: { id: applicationId },
            data: { status },
        });
        const candidate = await this.prisma.user.findUnique({
            where: { id: application.candidateId },
        });
        if (candidate) {
            await this.notificationsService.createNotification(candidate.id, client_1.NotificationType.JOB_STATUS_CHANGED, 'Application status updated', `Your application for ${application.job.title} is now ${status}.`, { jobId: application.job.id, status });
            const emailAllowed = await this.notificationsService.isEmailEnabled(candidate.id);
            if (emailAllowed) {
                await this.emailService.sendJobStatusChangedEmail(candidate.email, application.job.title, status);
            }
        }
        return updated;
    }
    getMyApplications(candidateId) {
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
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map