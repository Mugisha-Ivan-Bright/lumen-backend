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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const client_1 = require("@prisma/client");
const email_service_1 = require("../email/email.service");
let UsersService = class UsersService {
    constructor(prisma, notificationsService, emailService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
    }
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
    async getTalentById(id) {
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
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateProfile(userId, dto) {
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
    async updateAvailability(requestingUserId, targetUserId, dto) {
        if (requestingUserId !== targetUserId) {
            throw new common_1.ForbiddenException('You can only update your own availability');
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
    async updateAvatar(userId, targetUserId, avatarUrl) {
        if (userId !== targetUserId) {
            throw new common_1.ForbiddenException('You can only update your own avatar');
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
    async addUserSkill(userId, dto) {
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
            await this.notificationsService.createNotification(user.id, client_1.NotificationType.SKILL_ADDED, 'New skill added', `You added the skill ${skill.name}.`, { skillId: skill.id });
            const emailAllowed = await this.notificationsService.isEmailEnabled(user.id);
            if (emailAllowed) {
                await this.emailService.sendSkillAddedEmail(user.email, skill.name);
            }
        }
        return userSkill;
    }
    getUserSkills(userId) {
        return this.prisma.userSkill.findMany({
            where: { userId },
            include: {
                skill: true,
            },
        });
    }
    async updateUserSkill(userId, skillId, dto) {
        const existing = await this.prisma.userSkill.findFirst({
            where: { userId, skillId },
        });
        if (!existing) {
            throw new common_1.NotFoundException('User skill not found');
        }
        return this.prisma.userSkill.update({
            where: { id: existing.id },
            data: {
                level: dto.level,
            },
        });
    }
    async deleteUserSkill(userId, skillId) {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=users.service.js.map