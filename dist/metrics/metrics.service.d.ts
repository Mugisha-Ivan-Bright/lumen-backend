import { PrismaService } from '../prisma/prisma.service';
export declare class MetricsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserStats(userId: number): Promise<{
        userId: number;
        total_projects: number;
        total_skills: number;
        total_advisories: number;
    }>;
}
//# sourceMappingURL=metrics.service.d.ts.map