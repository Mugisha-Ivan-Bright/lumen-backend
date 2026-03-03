import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProject(ownerId: number, dto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        createdById: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        skillId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getProjects(): import(".prisma/client").Prisma.PrismaPromise<({
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
    getProjectById(id: number): Promise<{
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
    updateProject(userId: number, projectId: number, dto: UpdateProjectDto): Promise<{
        createdById: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        skillId: number | null;
    }>;
    deleteProject(userId: number, projectId: number): Promise<{
        message: string;
    }>;
    joinProject(userId: number, projectId: number): Promise<{
        message: string;
    }>;
    inviteToProject(projectId: number, inviterId: number, inviteeId: number): Promise<{
        message: string;
    }>;
    getMembers(projectId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    addComment(userId: number, projectId: number, dto: CreateCommentDto): import(".prisma/client").Prisma.Prisma__ProjectCommentClient<{
        userId: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        id: number;
        projectId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getComments(projectId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
//# sourceMappingURL=projects.service.d.ts.map