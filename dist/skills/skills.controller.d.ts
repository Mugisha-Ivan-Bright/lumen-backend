import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dtos/create-skill.dto';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        description: string | null;
        created_at: Date;
        id: number;
        updated_at: Date;
    }[]>;
    getById(id: number): Promise<{
        name: string;
        description: string | null;
        created_at: Date;
        id: number;
        updated_at: Date;
    }>;
    create(dto: CreateSkillDto): import(".prisma/client").Prisma.Prisma__SkillClient<{
        name: string;
        description: string | null;
        created_at: Date;
        id: number;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=skills.controller.d.ts.map