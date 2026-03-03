import { PrismaService } from '../prisma/prisma.service';
export declare class AdvisoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, content: string, projectId?: number): import(".prisma/client").Prisma.Prisma__AdvisoryClient<{
        userId: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        id: number;
        projectId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getUserAdvisories(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        id: number;
        projectId: number | null;
    }[]>;
}
//# sourceMappingURL=advisories.service.d.ts.map