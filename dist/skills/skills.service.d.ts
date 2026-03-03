import { PrismaService } from '../prisma/prisma.service';
export declare class SkillsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        description: string | null;
    }[]>;
    getById(id: number): Promise<{
        name: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        description: string | null;
    }>;
    create(name: string, description?: string): import(".prisma/client").Prisma.Prisma__SkillClient<{
        name: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        description: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=skills.service.d.ts.map