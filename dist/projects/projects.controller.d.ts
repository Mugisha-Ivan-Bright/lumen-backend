import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(req: any, dto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        createdById: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        skillId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getAll(): import(".prisma/client").Prisma.PrismaPromise<({
        created_by: {
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            email: string;
            password: string;
            avatar: string | null;
            availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
            is_verified: boolean;
            verification_token: string | null;
            verification_token_expires: Date | null;
            reset_password_token: string | null;
            reset_password_expires: Date | null;
        };
        skill: {
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            description: string | null;
        } | null;
    } & {
        createdById: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        skillId: number | null;
    })[]>;
    getById(id: number): Promise<{
        created_by: {
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            email: string;
            password: string;
            avatar: string | null;
            availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
            is_verified: boolean;
            verification_token: string | null;
            verification_token_expires: Date | null;
            reset_password_token: string | null;
            reset_password_expires: Date | null;
        };
        skill: {
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            description: string | null;
        } | null;
    } & {
        createdById: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        skillId: number | null;
    }>;
    update(req: any, id: number, dto: UpdateProjectDto): Promise<{
        createdById: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        skillId: number | null;
    }>;
    remove(req: any, id: number): Promise<{
        message: string;
    }>;
    join(req: any, id: number): Promise<{
        message: string;
    }>;
    invite(req: any, id: number, userId: number): Promise<{
        message: string;
    }>;
    members(id: number): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            email: string;
            password: string;
            avatar: string | null;
            availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
            is_verified: boolean;
            verification_token: string | null;
            verification_token_expires: Date | null;
            reset_password_token: string | null;
            reset_password_expires: Date | null;
        };
    } & {
        userId: number;
        id: number;
        projectId: number;
        role: import(".prisma/client").$Enums.ProjectMemberRole;
        joined_at: Date;
    })[]>;
    comment(req: any, id: number, dto: CreateCommentDto): import(".prisma/client").Prisma.Prisma__ProjectCommentClient<{
        userId: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        id: number;
        projectId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    comments(id: number): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            email: string;
            password: string;
            avatar: string | null;
            availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
            is_verified: boolean;
            verification_token: string | null;
            verification_token_expires: Date | null;
            reset_password_token: string | null;
            reset_password_expires: Date | null;
        };
    } & {
        userId: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        id: number;
        projectId: number;
    })[]>;
}
//# sourceMappingURL=projects.controller.d.ts.map