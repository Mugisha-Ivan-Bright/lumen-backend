import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getUsers(filters: {
        role?: string;
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const { role, status, search, page = 1, limit = 20 } = filters;
        const skip = (page - 1) * limit;

        const where: any = {};

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

    async getUserById(id: number) {
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

    async updateUserRole(id: number, role: string) {
        const user = await this.prisma.user.update({
            where: { id },
            data: { role: role as any },
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

    async updateUserStatus(id: number, status: string, reason?: string) {
        // Note: Prisma schema doesn't have status field, so we'll just return the user
        // In a real app, you'd add a status field to the User model
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

    async getAnalytics(startDate?: string, endDate?: string) {
        const [userCount, projectCount, jobCount] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.project.count(),
            this.prisma.job.count(),
        ]);

        // Get counts for this month
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const [newUsersThisMonth, projectsCreatedThisMonth, jobsPostedThisMonth] =
            await Promise.all([
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
                activeUsers: userCount, // Simplified - in real app, track last login
                newUsersThisMonth,
                projectsCreatedThisMonth,
                jobsPostedThisMonth,
                userGrowth: [], // Simplified - would need time-series data
                engagementMetrics: {
                    activeProjects,
                    activeJobs,
                    totalApplications,
                    totalAdvisorySessions: 0, // Simplified
                },
            },
        };
    }

    async getActivityLogs(page = 1, limit = 50) {
        // Simplified - in a real app, you'd have an activity_logs table
        return {
            data: [],
            total: 0,
            page,
            limit,
            totalPages: 0,
        };
    }
}
