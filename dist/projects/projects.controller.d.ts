import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(req: any, dto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        createdById: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getAll(): import(".prisma/client").Prisma.PrismaPromise<({
        skill: {
            name: string;
            created_at: Date;
            id: number;
            updated_at: Date;
            description: string | null;
        } | null;
        created_by: {
            name: string;
            email: string;
            password: string;
            avatar: string | null;
            created_at: Date;
            id: number;
            availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
            role: import(".prisma/client").$Enums.UserRole;
            is_verified: boolean;
            verification_token: string | null;
            verification_token_expires: Date | null;
            reset_password_token: string | null;
            reset_password_expires: Date | null;
            updated_at: Date;
        };
    } & {
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        createdById: number;
    })[]>;
    getById(id: number): Promise<{
        skill: {
            name: string;
            created_at: Date;
            id: number;
            updated_at: Date;
            description: string | null;
        } | null;
        created_by: {
            name: string;
            email: string;
            password: string;
            avatar: string | null;
            created_at: Date;
            id: number;
            availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
            role: import(".prisma/client").$Enums.UserRole;
            is_verified: boolean;
            verification_token: string | null;
            verification_token_expires: Date | null;
            reset_password_token: string | null;
            reset_password_expires: Date | null;
            updated_at: Date;
        };
    } & {
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        createdById: number;
    }>;
    update(req: any, id: number, dto: UpdateProjectDto): Promise<{
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        createdById: number;
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
            name: string;
            email: string;
            password: string;
            avatar: string | null;
            created_at: Date;
            id: number;
            availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
            role: import(".prisma/client").$Enums.UserRole;
            is_verified: boolean;
            verification_token: string | null;
            verification_token_expires: Date | null;
            reset_password_token: string | null;
            reset_password_expires: Date | null;
            updated_at: Date;
        };
    } & {
        userId: number;
        id: number;
        role: import(".prisma/client").$Enums.ProjectMemberRole;
        joined_at: Date;
        projectId: number;
    })[]>;
    comment(req: any, id: number, dto: CreateCommentDto): Promise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        content: string;
        projectId: number;
    }>;
    comments(id: number): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string;
            email: string;
            password: string;
            avatar: string | null;
            created_at: Date;
            id: number;
            availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
            role: import(".prisma/client").$Enums.UserRole;
            is_verified: boolean;
            verification_token: string | null;
            verification_token_expires: Date | null;
            reset_password_token: string | null;
            reset_password_expires: Date | null;
            updated_at: Date;
        };
    } & {
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        content: string;
        projectId: number;
    })[]>;
}
//# sourceMappingURL=projects.controller.d.ts.map