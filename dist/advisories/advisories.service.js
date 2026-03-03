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
exports.AdvisoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const client_1 = require("@prisma/client");
const email_service_1 = require("../email/email.service");
let AdvisoriesService = class AdvisoriesService {
    constructor(prisma, notificationsService, emailService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
    }
    async create(userId, content, projectId) {
        const advisory = await this.prisma.advisory.create({
            data: {
                userId,
                content,
                projectId,
            },
        });
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            await this.notificationsService.createNotification(user.id, client_1.NotificationType.CONTRIBUTION_UPGRADED, 'Contribution increased', 'Your contributions on LUMEN just increased.', { advisoryId: advisory.id });
            const emailAllowed = await this.notificationsService.isEmailEnabled(user.id);
            if (emailAllowed) {
                await this.emailService.sendContributionUpgradedEmail(user.email);
            }
        }
        return advisory;
    }
    getUserAdvisories(userId) {
        return this.prisma.advisory.findMany({
            where: { userId },
            orderBy: { created_at: 'desc' },
        });
    }
};
exports.AdvisoriesService = AdvisoriesService;
exports.AdvisoriesService = AdvisoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService])
], AdvisoriesService);
//# sourceMappingURL=advisories.service.js.map