import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Req() req: any) {
    return this.notificationsService.listForUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  markRead(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.markAsRead(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('read-all')
  markAllRead(@Req() req: any) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preferences')
  getPreferences(@Req() req: any) {
    return this.notificationsService.getPreferencesForUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('preferences')
  updatePreferences(
    @Req() req: any,
    @Body()
    body: {
      emailEnabled?: boolean;
      inAppEnabled?: boolean;
      snoozeUntil?: string | null;
    },
  ) {
    const snoozeUntil =
      body.snoozeUntil === undefined
        ? undefined
        : body.snoozeUntil === null
        ? null
        : new Date(body.snoozeUntil);
    return this.notificationsService.updatePreferences(req.user.userId, {
      emailEnabled: body.emailEnabled,
      inAppEnabled: body.inAppEnabled,
      snoozeUntil,
    });
  }
}

