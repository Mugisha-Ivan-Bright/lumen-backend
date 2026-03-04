"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketGatewayService = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
let WebSocketGatewayService = class WebSocketGatewayService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.userSockets = new Map();
        this.onlineUsers = new Set();
    }
    async handleConnection(client) {
        try {
            let token = client.handshake.auth.token;
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
            const userId = payload.sub;
            this.userSockets.set(userId, client.id);
            this.onlineUsers.add(userId);
            client.data.userId = userId;
            const onlineUsersList = Array.from(this.onlineUsers);
            client.emit('online:users', { users: onlineUsersList });
            this.server.emit('user:online', { userId });
            console.log(`User ${userId} connected with socket ${client.id}`);
        }
        catch (error) {
            console.error('WebSocket connection error:', error);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = client.data.userId;
        if (userId) {
            this.userSockets.delete(userId);
            this.onlineUsers.delete(userId);
            this.server.emit('user:offline', { userId });
            console.log(`User ${userId} disconnected`);
        }
    }
    handleTypingStart(client, data) {
        const userId = client.data.userId;
        const socketId = this.userSockets.get(data.recipientId);
        if (socketId) {
            this.server.to(socketId).emit('typing:start', { userId });
        }
    }
    handleTypingStop(client, data) {
        const userId = client.data.userId;
        const socketId = this.userSockets.get(data.recipientId);
        if (socketId) {
            this.server.to(socketId).emit('typing:stop', { userId });
        }
    }
    sendNotificationToUser(userId, notification) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.server.to(socketId).emit('notification', notification);
        }
    }
    sendMessageToUser(userId, message) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.server.to(socketId).emit('message', message);
        }
    }
    isUserOnline(userId) {
        return this.onlineUsers.has(userId);
    }
    getOnlineUsers() {
        return Array.from(this.onlineUsers);
    }
    broadcast(event, data) {
        this.server.emit(event, data);
    }
    sendToRoom(room, event, data) {
        this.server.to(room).emit(event, data);
    }
};
exports.WebSocketGatewayService = WebSocketGatewayService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebSocketGatewayService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing:start'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], WebSocketGatewayService.prototype, "handleTypingStart", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing:stop'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], WebSocketGatewayService.prototype, "handleTypingStop", null);
exports.WebSocketGatewayService = WebSocketGatewayService = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], WebSocketGatewayService);
//# sourceMappingURL=websocket.gateway.js.map