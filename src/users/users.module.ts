import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { EmailModule } from '../email/email.module';
@Module({
  imports: [CloudinaryModule, EmailModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

