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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(filters) {
        const { role, status, search, page = 1, limit = 20 } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (role) {
            where.role = role;
        }
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatar: true,
                    created_at: true,
                    updated_at: true,
                },
                orderBy: {
                    created_at: 'desc',
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                created_at: true,
                updated_at: true,
            },
        });
        return { data: user };
    }
    async updateUserRole(id, role) {
        const user = await this.prisma.user.update({
            where: { id },
            data: { role: role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                created_at: true,
                updated_at: true,
            },
        });
        return { data: user };
    }
    async updateUserStatus(id, status, reason) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                created_at: true,
                updated_at: true,
            },
        });
        return { data: user };
    }
    async getAnalytics(startDate, endDate) {
        const [userCount, projectCount, jobCount] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.project.count(),
            this.prisma.job.count(),
        ]);
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const [newUsersThisMonth, projectsCreatedThisMonth, jobsPostedThisMonth] = await Promise.all([
            this.prisma.user.count({
                where: {
                    created_at: {
                        gte: firstDayOfMonth,
                    },
                },
            }),
            this.prisma.project.count({
                where: {
                    created_at: {
                        gte: firstDayOfMonth,
                    },
                },
            }),
            this.prisma.job.count({
                where: {
                    created_at: {
                        gte: firstDayOfMonth,
                    },
                },
            }),
        ]);
        const [activeProjects, activeJobs, totalApplications] = await Promise.all([
            this.prisma.project.count({
                where: {
                    status: 'active',
                },
            }),
            this.prisma.job.count({
                where: {
                    status: 'open',
                },
            }),
            this.prisma.jobApplication.count(),
        ]);
        return {
            data: {
                userCount,
                projectCount,
                jobCount,
                activeUsers: userCount,
                newUsersThisMonth,
                projectsCreatedThisMonth,
                jobsPostedThisMonth,
                userGrowth: [],
                engagementMetrics: {
                    activeProjects,
                    activeJobs,
                    totalApplications,
                    totalAdvisorySessions: 0,
                },
            },
        };
    }
    async getActivityLogs(page = 1, limit = 50) {
        return {
            data: [],
            total: 0,
            page,
            limit,
            totalPages: 0,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map