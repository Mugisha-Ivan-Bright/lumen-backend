import { ApplicationsService } from './applications.service';
import { ApplyJobDto } from './dtos/apply-job.dto';
import { UpdateApplicationStatusDto } from './dtos/update-application-status.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class ApplicationsController {
    private readonly applicationsService;
    private readonly cloudinaryService;
    constructor(applicationsService: ApplicationsService, cloudinaryService: CloudinaryService);
    applyToJob(req: any, id: number, dto: ApplyJobDto, file?: Express.Multer.File): Promise<{
        created_at: Date;
        id: number;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        jobId: number;
        cover_letter: string | null;
        cv_url: string | null;
        candidateId: number;
    }>;
    getMyApplications(req: any): import(".prisma/client").Prisma.PrismaPromise<({
        job: {
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
    getJobApplications(req: any, id: number): Promise<({
        candidate: {
            userSkills: ({
                skill: {
                    name: string;
                    description: string | null;
                    created_at: Date;
                    id: number;
                    updated_at: Date;
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
    updateStatus(req: any, id: number, dto: UpdateApplicationStatusDto): Promise<{
        created_at: Date;
        id: number;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        jobId: number;
        cover_letter: string | null;
        cv_url: string | null;
        candidateId: number;
    }>;
}
//# sourceMappingURL=applications.controller.d.ts.map