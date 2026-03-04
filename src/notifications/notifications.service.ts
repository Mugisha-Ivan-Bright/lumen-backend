import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType, Prisma } from '@prisma/client';
import { WebSocketGatewayService } from '../websocket/websocket.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketGateway: WebSocketGatewayService,
  ) { }

  private async getPreferences(userId: number) {
    let prefs = await this.prisma.notificationPreference.findUnique({
      where: { userId },
    });

    if (!prefs) {
      prefs = await this.prisma.notificationPreference.create({
        data: { userId },
      });
    }

    return prefs;
  }

  async isInAppEnabled(userId: number): Promise<boolean> {
    const prefs = await this.getPreferences(userId);

    if (!prefs.inAppEnabled) return false;
    if (prefs.snoozeUntil && prefs.snoozeUntil > new Date()) return false;

    return true;
  }

  async isEmailEnabled(userId: number): Promise<boolean> {
    const prefs = await this.getPreferences(userId);

    if (!prefs.emailEnabled) return false;
    if (prefs.snoozeUntil && prefs.snoozeUntil > new Date()) return false;

    return true;
  }

  async createNotification(
    userId: number,
    type: NotificationType,
    title: string,
    body: string,
    data?: Prisma.InputJsonValue,
  ) {
    const allowed = await this.isInAppEnabled(userId);

    if (!allowed) {
      return null;
    }

    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        body,
        data,
      },
    });

    // Emit WebSocket event to user
    this.websocketGateway.sendNotificationToUser(userId, notification);

    return notification;
  }

  listForUser(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { created_at: 'desc' },
    });
  }

  async markAsRead(userId: number, notificationId: number) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      return;
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { readAt: new Date() },
    });
  }

  markAllAsRead(userId: number) {
    return this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  async getPreferencesForUser(userId: number) {
    return this.getPreferences(userId);
  }

  async updatePreferences(
    userId: number,
    opts: {
      emailEnabled?: boolean;
      inAppEnabled?: boolean;
      snoozeUntil?: Date | null;
    },
  ) {
    const data: any = {};

    if (typeof opts.emailEnabled === 'boolean') {
      data.emailEnabled = opts.emailEnabled;
    }

    if (typeof opts.inAppEnabled === 'boolean') {
      data.inAppEnabled = opts.inAppEnabled;
    }

    if (opts.snoozeUntil !== undefined) {
      data.snoozeUntil = opts.snoozeUntil;
    }

    return this.prisma.notificationPreference.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  }
}
