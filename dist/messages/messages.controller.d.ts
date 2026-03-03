import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    send(req: any, receiverId: number, content: string): import(".prisma/client").Prisma.Prisma__MessageClient<{
        content: string;
        created_at: Date;
        id: number;
        read_status: boolean;
        senderId: number;
        receiverId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    conversations(req: any): Promise<{
        userId: number;
        user: any;
    }[]>;
    conversation(req: any, userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        content: string;
        created_at: Date;
        id: number;
        read_status: boolean;
        senderId: number;
        receiverId: number;
    }[]>;
}
//# sourceMappingURL=messages.controller.d.ts.map