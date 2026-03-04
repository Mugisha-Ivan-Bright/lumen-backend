import { PrismaService } from '../prisma/prisma.service';
import { NotificationType, Prisma } from '@prisma/client';
import { WebSocketGatewayService } from '../websocket/websocket.gateway';
export declare class NotificationsService {
    private readonly prisma;
    private readonly websocketGateway;
    constructor(prisma: PrismaService, websocketGateway: WebSocketGatewayService);
    private getPreferences;
    isInAppEnabled(userId: number): Promise<boolean>;
    isEmailEnabled(userId: number): Promise<boolean>;
    createNotification(userId: number, type: NotificationType, title: string, body: string, data?: Prisma.InputJsonValue): Promise<{
        userId: number;
        data: Prisma.JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        readAt: Date | null;
        created_at: Date;
        id: number;
    } | null>;
    listForUser(userId: number): Prisma.PrismaPromise<{
        userId: number;
        data: Prisma.JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        readAt: Date | null;
        created_at: Date;
        id: number;
    }[]>;
    markAsRead(userId: number, notificationId: number): Promise<{
        userId: number;
        data: Prisma.JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        readAt: Date | null;
        created_at: Date;
        id: number;
    } | undefined>;
    markAllAsRead(userId: number): Prisma.PrismaPromise<Prisma.BatchPayload>;
    getPreferencesForUser(userId: number): Promise<{
        userId: number;
        emailEnabled: boolean;
        inAppEnabled: boolean;
        snoozeUntil: Date | null;
    }>;
    updatePreferences(userId: number, opts: {
        emailEnabled?: boolean;
        inAppEnabled?: boolean;
        snoozeUntil?: Date | null;
    }): Promise<{
        userId: number;
        emailEnabled: boolean;
        inAppEnabled: boolean;
        snoozeUntil: Date | null;
    }>;
}
//# sourceMappingURL=notifications.service.d.ts.map