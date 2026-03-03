import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    list(req: any): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        readAt: Date | null;
        created_at: Date;
        id: number;
    }[]>;
    markRead(req: any, id: number): Promise<{
        userId: number;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        readAt: Date | null;
        created_at: Date;
        id: number;
    } | undefined>;
    markAllRead(req: any): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    getPreferences(req: any): Promise<{
        userId: number;
        emailEnabled: boolean;
        inAppEnabled: boolean;
        snoozeUntil: Date | null;
    }>;
    updatePreferences(req: any, body: {
        emailEnabled?: boolean;
        inAppEnabled?: boolean;
        snoozeUntil?: string | null;
    }): Promise<{
        userId: number;
        emailEnabled: boolean;
        inAppEnabled: boolean;
        snoozeUntil: Date | null;
    }>;
}
//# sourceMappingURL=notifications.controller.d.ts.map