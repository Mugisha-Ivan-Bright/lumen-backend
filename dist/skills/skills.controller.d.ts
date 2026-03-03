import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dtos/create-skill.dto';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        created_at: Date;
        updated_at: Date;
        id: number;
        name: string;
        description: string | null;
    }[]>;
    getById(id: number): Promise<{
        created_at: Date;
        updated_at: Date;
        id: number;
        name: string;
        description: string | null;
    }>;
    create(dto: CreateSkillDto): import(".prisma/client").Prisma.Prisma__SkillClient<{
        created_at: Date;
        updated_at: Date;
        id: number;
        name: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=skills.controller.d.ts.map