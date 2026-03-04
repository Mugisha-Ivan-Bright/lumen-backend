import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    send(req: any, receiverId: number, content: string, fileUrl?: string, fileName?: string, fileType?: string): Promise<{
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
    conversations(req: any): Promise<{
        userId: number;
        user: any;
    }[]>;
    conversation(req: any, userId: number): import(".prisma/client").Prisma.PrismaPromise<{
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
//# sourceMappingURL=messages.controller.d.ts.map