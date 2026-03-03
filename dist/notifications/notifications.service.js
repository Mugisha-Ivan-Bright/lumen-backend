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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPreferences(userId) {
        let prefs = await this.prisma.notificationPreference.findUnique({
            where: { userId },
        });
        if (!prefs) {
            prefs = await this.prisma.notificationPreference.create({
                data: { userId },
            });
        }
        return prefs;
    }
    async isInAppEnabled(userId) {
        const prefs = await this.getPreferences(userId);
        if (!prefs.inAppEnabled)
            return false;
        if (prefs.snoozeUntil && prefs.snoozeUntil > new Date())
            return false;
        return true;
    }
    async isEmailEnabled(userId) {
        const prefs = await this.getPreferences(userId);
        if (!prefs.emailEnabled)
            return false;
        if (prefs.snoozeUntil && prefs.snoozeUntil > new Date())
            return false;
        return true;
    }
    async createNotification(userId, type, title, body, data) {
        const allowed = await this.isInAppEnabled(userId);
        if (!allowed) {
            return null;
        }
        return this.prisma.notification.create({
            data: {
                userId,
                type,
                title,
                body,
                data,
            },
        });
    }
    listForUser(userId) {
        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { created_at: 'desc' },
        });
    }
    async markAsRead(userId, notificationId) {
        const notification = await this.prisma.notification.findUnique({
            where: { id: notificationId },
        });
        if (!notification || notification.userId !== userId) {
            return;
        }
        return this.prisma.notification.update({
            where: { id: notificationId },
            data: { readAt: new Date() },
        });
    }
    markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { userId, readAt: null },
            data: { readAt: new Date() },
        });
    }
    async getPreferencesForUser(userId) {
        return this.getPreferences(userId);
    }
    async updatePreferences(userId, opts) {
        const data = {};
        if (typeof opts.emailEnabled === 'boolean') {
            data.emailEnabled = opts.emailEnabled;
        }
        if (typeof opts.inAppEnabled === 'boolean') {
            data.inAppEnabled = opts.inAppEnabled;
        }
        if (opts.snoozeUntil !== undefined) {
            data.snoozeUntil = opts.snoozeUntil;
        }
        return this.prisma.notificationPreference.upsert({
            where: { userId },
            update: data,
            create: Object.assign({ userId }, data),
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map