import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class WebSocketGatewayService implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    server: Server;
    private userSockets;
    private onlineUsers;
    constructor(jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleTypingStart(client: Socket, data: {
        recipientId: number;
    }): void;
    handleTypingStop(client: Socket, data: {
        recipientId: number;
    }): void;
    sendNotificationToUser(userId: number, notification: any): void;
    sendMessageToUser(userId: number, message: any): void;
    isUserOnline(userId: number): boolean;
    getOnlineUsers(): number[];
    broadcast(event: string, data: any): void;
    sendToRoom(room: string, event: string, data: any): void;
}
//# sourceMappingURL=websocket.gateway.d.ts.map