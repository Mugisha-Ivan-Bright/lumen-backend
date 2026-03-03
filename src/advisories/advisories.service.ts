import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@prisma/client';
import { EmailService } from '../email/email.service';

@Injectable()
export class AdvisoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
  ) {}

  async create(userId: number, content: string, projectId?: number) {
    const advisory = await this.prisma.advisory.create({
      data: {
        userId,
        content,
        projectId,
      },
    });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      await this.notificationsService.createNotification(
        user.id,
        NotificationType.CONTRIBUTION_UPGRADED,
        'Contribution increased',
        'Your contributions on LUMEN just increased.',
        { advisoryId: advisory.id },
      );
      const emailAllowed =
        await this.notificationsService.isEmailEnabled(user.id);
      if (emailAllowed) {
        await this.emailService.sendContributionUpgradedEmail(user.email);
      }
    }
    return advisory;
  }

  getUserAdvisories(userId: number) {
    return this.prisma.advisory.findMany({
      where: { userId },
      orderBy: { created_at: 'desc' },
    });
  }
}

