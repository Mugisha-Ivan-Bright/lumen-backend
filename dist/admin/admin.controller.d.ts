import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getUsers(role?: string, status?: string, search?: string, page?: string, limit?: string): Promise<{
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
    getUser(id: number): Promise<{
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
    getActivityLogs(page?: string, limit?: string): Promise<{
        data: never[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
//# sourceMappingURL=admin.controller.d.ts.map