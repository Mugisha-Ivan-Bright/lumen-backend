import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';
export declare class JobsService {
    private readonly prisma;
    private readonly notificationsService;
    private readonly emailService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, emailService: EmailService);
    createJob(recruiterId: number, dto: CreateJobDto): Promise<{
        description: string | null;
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        status: import(".prisma/client").$Enums.JobStatus;
        createdById: number;
        location: string | null;
        employment_type: import(".prisma/client").$Enums.EmploymentType;
    }>;
    getPublicJobs(params: {
        skillId?: number;
        location?: string;
        employment_type?: string;
    }): import(".prisma/client").Prisma.PrismaPromise<({
        skill: {
            name: string;
            description: string | null;
            created_at: Date;
            id: number;
            updated_at: Date;
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
        description: string | null;
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        status: import(".prisma/client").$Enums.JobStatus;
        createdById: number;
        location: string | null;
        employment_type: import(".prisma/client").$Enums.EmploymentType;
    })[]>;
    getJobById(id: number): Promise<{
        skill: {
            name: string;
            description: string | null;
            created_at: Date;
            id: number;
            updated_at: Date;
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
        description: string | null;
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        status: import(".prisma/client").$Enums.JobStatus;
        createdById: number;
        location: string | null;
        employment_type: import(".prisma/client").$Enums.EmploymentType;
    }>;
    getMyJobs(recruiterId: number): import(".prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        status: import(".prisma/client").$Enums.JobStatus;
        createdById: number;
        location: string | null;
        employment_type: import(".prisma/client").$Enums.EmploymentType;
    }[]>;
    updateJob(recruiterId: number, jobId: number, dto: UpdateJobDto): Promise<{
        description: string | null;
        title: string;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number | null;
        status: import(".prisma/client").$Enums.JobStatus;
        createdById: number;
        location: string | null;
        employment_type: import(".prisma/client").$Enums.EmploymentType;
    }>;
    deleteJob(recruiterId: number, jobId: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=jobs.service.d.ts.map