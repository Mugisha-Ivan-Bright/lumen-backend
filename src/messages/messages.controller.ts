import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  send(
    @Req() req: any,
    @Body('receiverId', ParseIntPipe) receiverId: number,
    @Body('content') content: string,
  ) {
    return this.messagesService.sendMessage(req.user.userId, receiverId, content);
  }

  @UseGuards(JwtAuthGuard)
  @Get('conversations')
  conversations(@Req() req: any) {
    return this.messagesService.getConversations(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  conversation(@Req() req: any, @Param('userId', ParseIntPipe) userId: number) {
    return this.messagesService.getConversation(req.user.userId, userId);
  }
}

