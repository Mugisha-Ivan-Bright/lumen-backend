import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';
export declare class ProjectsService {
    private readonly prisma;
    private readonly notificationsService;
    private readonly emailService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, emailService: EmailService);
    createProject(ownerId: number, dto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        createdById: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getProjects(): import(".prisma/client").Prisma.PrismaPromise<({
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
    getProjectById(id: number): Promise<{
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
    updateProject(userId: number, projectId: number, dto: UpdateProjectDto): Promise<{
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        description: string | null;
        status: import(".prisma/client").$Enums.ProjectStatus;
        createdById: number;
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
    addComment(userId: number, projectId: number, dto: CreateCommentDto): Promise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        content: string;
        projectId: number;
    }>;
    getComments(projectId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
//# sourceMappingURL=projects.service.d.ts.map