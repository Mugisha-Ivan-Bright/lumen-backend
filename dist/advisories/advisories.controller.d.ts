import { AdvisoriesService } from './advisories.service';
export declare class AdvisoriesController {
    private readonly advisoriesService;
    constructor(advisoriesService: AdvisoriesService);
    create(req: any, content: string, projectId?: number): Promise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        content: string;
        projectId: number | null;
    }>;
    getUserAdvisories(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        content: string;
        projectId: number | null;
    }[]>;
}
//# sourceMappingURL=advisories.controller.d.ts.map