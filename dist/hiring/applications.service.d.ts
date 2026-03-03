import { PrismaService } from '../prisma/prisma.service';
import { ApplicationStatus } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';
export declare class ApplicationsService {
    private readonly prisma;
    private readonly notificationsService;
    private readonly emailService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, emailService: EmailService);
    applyToJob(candidateId: number, jobId: number, coverLetter?: string, cvUrl?: string): Promise<{
        created_at: Date;
        id: number;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        jobId: number;
        cover_letter: string | null;
        cv_url: string | null;
        candidateId: number;
    }>;
    getJobApplications(recruiterId: number, jobId: number): Promise<({
        candidate: {
            userSkills: ({
                skill: {
                    name: string;
                    created_at: Date;
                    id: number;
                    updated_at: Date;
                    description: string | null;
                };
            } & {
                userId: number;
                created_at: Date;
                id: number;
                updated_at: Date;
                skillId: number;
                level: import(".prisma/client").$Enums.SkillLevel;
            })[];
        } & {
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
        created_at: Date;
        id: number;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        jobId: number;
        cover_letter: string | null;
        cv_url: string | null;
        candidateId: number;
    })[]>;
    updateApplicationStatus(recruiterId: number, applicationId: number, status: ApplicationStatus): Promise<{
        created_at: Date;
        id: number;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        jobId: number;
        cover_letter: string | null;
        cv_url: string | null;
        candidateId: number;
    }>;
    getMyApplications(candidateId: number): import(".prisma/client").Prisma.PrismaPromise<({
        job: {
            title: string;
            created_at: Date;
            id: number;
            updated_at: Date;
            skillId: number | null;
            description: string | null;
            status: import(".prisma/client").$Enums.JobStatus;
            createdById: number;
            location: string | null;
            employment_type: import(".prisma/client").$Enums.EmploymentType;
        };
    } & {
        created_at: Date;
        id: number;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        jobId: number;
        cover_letter: string | null;
        cv_url: string | null;
        candidateId: number;
    })[]>;
}
//# sourceMappingURL=applications.service.d.ts.map