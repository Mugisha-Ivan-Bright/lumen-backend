import { PrismaService } from '../prisma/prisma.service';
import { WebSocketGatewayService } from '../websocket/websocket.gateway';
export declare class MessagesService {
    private readonly prisma;
    private readonly websocketGateway;
    constructor(prisma: PrismaService, websocketGateway: WebSocketGatewayService);
    sendMessage(senderId: number, receiverId: number, content: string, fileUrl?: string, fileName?: string, fileType?: string): Promise<{
        sender: {
            name: string;
            avatar: string | null;
            id: number;
        };
        receiver: {
            name: string;
            avatar: string | null;
            id: number;
        };
    } & {
        created_at: Date;
        id: number;
        content: string;
        read_status: boolean;
        file_url: string | null;
        file_name: string | null;
        file_type: string | null;
        senderId: number;
        receiverId: number;
    }>;
    getConversations(userId: number): Promise<{
        userId: number;
        user: any;
    }[]>;
    getConversation(userId: number, otherUserId: number): import(".prisma/client").Prisma.PrismaPromise<{
        created_at: Date;
        id: number;
        content: string;
        read_status: boolean;
        file_url: string | null;
        file_name: string | null;
        file_type: string | null;
        senderId: number;
        receiverId: number;
    }[]>;
}
//# sourceMappingURL=messages.service.d.ts.map