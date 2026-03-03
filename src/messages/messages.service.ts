import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  sendMessage(senderId: number, receiverId: number, content: string) {
    return this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
  }

  async getConversations(userId: number) {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    const map = new Map<number, { userId: number; user: any }>();

    for (const msg of messages) {
      const other =
        msg.senderId === userId ? msg.receiver : msg.sender;
      if (!map.has(other.id)) {
        map.set(other.id, { userId: other.id, user: other });
      }
    }

    return Array.from(map.values());
  }

  getConversation(userId: number, otherUserId: number) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      orderBy: { created_at: 'asc' },
    });
  }
}

