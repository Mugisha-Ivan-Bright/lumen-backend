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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
const email_service_1 = require("../email/email.service");
let JobsService = class JobsService {
    constructor(prisma, notificationsService, emailService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
    }
    async createJob(recruiterId, dto) {
        var _a, _b, _c;
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
                const skillName = (_c = (_b = (_a = user.userSkills[0]) === null || _a === void 0 ? void 0 : _a.skill) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'your skill';
                await this.notificationsService.createNotification(user.id, client_1.NotificationType.NEW_JOB_FOR_SKILL, 'New job for your skill', `A new job "${job.title}" matches your skill ${skillName}.`, { jobId: job.id });
                const emailAllowed = await this.notificationsService.isEmailEnabled(user.id);
                if (emailAllowed) {
                    await this.emailService.sendNewJobForSkillEmail(user.email, skillName, job.title);
                }
            }
        }
        return job;
    }
    getPublicJobs(params) {
        const { skillId, location, employment_type } = params;
        return this.prisma.job.findMany({
            where: {
                status: client_1.JobStatus.open,
                skillId: skillId,
                location: location ? { contains: location, mode: 'insensitive' } : undefined,
                employment_type: employment_type,
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
    async getJobById(id) {
        const job = await this.prisma.job.findUnique({
            where: { id },
            include: {
                skill: true,
                created_by: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return job;
    }
    getMyJobs(recruiterId) {
        return this.prisma.job.findMany({
            where: {
                createdById: recruiterId,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    }
    async updateJob(recruiterId, jobId, dto) {
        var _a, _b, _c, _d, _e, _f;
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.createdById !== recruiterId) {
            throw new common_1.ForbiddenException('You can only update your own jobs');
        }
        return this.prisma.job.update({
            where: { id: jobId },
            data: {
                title: (_a = dto.title) !== null && _a !== void 0 ? _a : job.title,
                description: (_b = dto.description) !== null && _b !== void 0 ? _b : job.description,
                location: (_c = dto.location) !== null && _c !== void 0 ? _c : job.location,
                employment_type: (_d = dto.employment_type) !== null && _d !== void 0 ? _d : job.employment_type,
                status: (_e = dto.status) !== null && _e !== void 0 ? _e : job.status,
                skillId: (_f = dto.skillId) !== null && _f !== void 0 ? _f : job.skillId,
            },
        });
    }
    async deleteJob(recruiterId, jobId) {
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.createdById !== recruiterId) {
            throw new common_1.ForbiddenException('You can only delete your own jobs');
        }
        await this.prisma.job.update({
            where: { id: jobId },
            data: {
                status: client_1.JobStatus.closed,
            },
        });
        return { message: 'Job closed' };
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map