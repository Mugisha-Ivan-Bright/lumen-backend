import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';
export declare class AdvisoriesService {
    private readonly prisma;
    private readonly notificationsService;
    private readonly emailService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, emailService: EmailService);
    create(userId: number, content: string, projectId?: number): Promise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        content: string;
        projectId: number | null;
    }>;
    getUserAdvisories(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        content: string;
        projectId: number | null;
    }[]>;
}
//# sourceMappingURL=advisories.service.d.ts.map