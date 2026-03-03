import { AdvisoriesService } from './advisories.service';
export declare class AdvisoriesController {
    private readonly advisoriesService;
    constructor(advisoriesService: AdvisoriesService);
    create(req: any, content: string, projectId?: number): import(".prisma/client").Prisma.Prisma__AdvisoryClient<{
        userId: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        id: number;
        projectId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getUserAdvisories(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        id: number;
        projectId: number | null;
    }[]>;
}
//# sourceMappingURL=advisories.controller.d.ts.map