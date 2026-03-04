import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(filters: {
        role?: string;
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: {
            name: string;
            email: string;
            avatar: string | null;
            created_at: Date;
            id: number;
            role: import(".prisma/client").$Enums.UserRole;
            updated_at: Date;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserById(id: number): Promise<{
        data: {
            name: string;
            email: string;
            avatar: string | null;
            created_at: Date;
            id: number;
            role: import(".prisma/client").$Enums.UserRole;
            updated_at: Date;
        } | null;
    }>;
    updateUserRole(id: number, role: string): Promise<{
        data: {
            name: string;
            email: string;
            avatar: string | null;
            created_at: Date;
            id: number;
            role: import(".prisma/client").$Enums.UserRole;
            updated_at: Date;
        };
    }>;
    updateUserStatus(id: number, status: string, reason?: string): Promise<{
        data: {
            name: string;
            email: string;
            avatar: string | null;
            created_at: Date;
            id: number;
            role: import(".prisma/client").$Enums.UserRole;
            updated_at: Date;
        } | null;
    }>;
    getAnalytics(startDate?: string, endDate?: string): Promise<{
        data: {
            userCount: number;
            projectCount: number;
            jobCount: number;
            activeUsers: number;
            newUsersThisMonth: number;
            projectsCreatedThisMonth: number;
            jobsPostedThisMonth: number;
            userGrowth: never[];
            engagementMetrics: {
                activeProjects: number;
                activeJobs: number;
                totalApplications: number;
                totalAdvisorySessions: number;
            };
        };
    }>;
    getActivityLogs(page?: number, limit?: number): Promise<{
        data: never[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
//# sourceMappingURL=admin.service.d.ts.map