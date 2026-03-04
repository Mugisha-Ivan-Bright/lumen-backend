import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    },
})
export class WebSocketGatewayService
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private userSockets: Map<number, string> = new Map();
    private onlineUsers: Set<number> = new Set();

    constructor(private jwtService: JwtService) { }

    async handleConnection(client: Socket) {
        try {
            // Try to get token from auth handshake first
            let token = client.handshake.auth.token;

            // If not in auth, try to extract from cookies
            if (!token) {
                const cookies = client.handshake.headers.cookie;
                if (cookies) {
                    const cookieArray = cookies.split(';').map(c => c.trim());
                    const accessTokenCookie = cookieArray.find(c => c.startsWith('accessToken='));
                    if (accessTokenCookie) {
                        token = accessTokenCookie.split('=')[1];
                    }
                }
            }

            if (!token) {
                console.log('No token found, disconnecting client');
                client.disconnect();
                return;
            }

            const payload = await this.jwtService.verifyAsync(token);
            const userId = payload.sub; // JWT uses 'sub' for user ID

            this.userSockets.set(userId, client.id);
            this.onlineUsers.add(userId);
            client.data.userId = userId;

            // Send current online users to the newly connected user
            const onlineUsersList = Array.from(this.onlineUsers);
            client.emit('online:users', { users: onlineUsersList });

            // Broadcast user online status to all other users
            this.server.emit('user:online', { userId });

            console.log(`User ${userId} connected with socket ${client.id}`);
        } catch (error) {
            console.error('WebSocket connection error:', error);
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        const userId = client.data.userId;
        if (userId) {
            this.userSockets.delete(userId);
            this.onlineUsers.delete(userId);

            // Broadcast user offline status
            this.server.emit('user:offline', { userId });

            console.log(`User ${userId} disconnected`);
        }
    }

    @SubscribeMessage('typing:start')
    handleTypingStart(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { recipientId: number },
    ) {
        const userId = client.data.userId;
        const socketId = this.userSockets.get(data.recipientId);

        if (socketId) {
            this.server.to(socketId).emit('typing:start', { userId });
        }
    }

    @SubscribeMessage('typing:stop')
    handleTypingStop(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { recipientId: number },
    ) {
        const userId = client.data.userId;
        const socketId = this.userSockets.get(data.recipientId);

        if (socketId) {
            this.server.to(socketId).emit('typing:stop', { userId });
        }
    }

    // Send notification to specific user
    sendNotificationToUser(userId: number, notification: any) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.server.to(socketId).emit('notification', notification);
        }
    }

    // Send message to specific user
    sendMessageToUser(userId: number, message: any) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.server.to(socketId).emit('message', message);
        }
    }

    // Check if user is online
    isUserOnline(userId: number): boolean {
        return this.onlineUsers.has(userId);
    }

    // Get all online users
    getOnlineUsers(): number[] {
        return Array.from(this.onlineUsers);
    }

    // Broadcast to all connected users
    broadcast(event: string, data: any) {
        this.server.emit(event, data);
    }

    // Send to specific room
    sendToRoom(room: string, event: string, data: any) {
        this.server.to(room).emit(event, data);
    }
}
