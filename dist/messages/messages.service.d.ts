import { PrismaService } from '../prisma/prisma.service';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    sendMessage(senderId: number, receiverId: number, content: string): import(".prisma/client").Prisma.Prisma__MessageClient<{
        created_at: Date;
        id: number;
        content: string;
        read_status: boolean;
        senderId: number;
        receiverId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getConversations(userId: number): Promise<{
        userId: number;
        user: any;
    }[]>;
    getConversation(userId: number, otherUserId: number): import(".prisma/client").Prisma.PrismaPromise<{
        created_at: Date;
        id: number;
        content: string;
        read_status: boolean;
        senderId: number;
        receiverId: number;
    }[]>;
}
//# sourceMappingURL=messages.service.d.ts.map