import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WebSocketGatewayService } from '../websocket/websocket.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketGateway: WebSocketGatewayService,
  ) { }

  async sendMessage(
    senderId: number,
    receiverId: number,
    content: string,
    fileUrl?: string,
    fileName?: string,
    fileType?: string,
  ) {
    const message = await this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
        file_url: fileUrl,
        file_name: fileName,
        file_type: fileType,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Emit WebSocket event to receiver
    this.websocketGateway.sendMessageToUser(receiverId, message);

    return message;
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

