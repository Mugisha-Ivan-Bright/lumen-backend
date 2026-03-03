import { IsEnum } from 'class-validator';
import { AvailabilityStatus } from '@prisma/client';

export class UpdateAvailabilityDto {
  @IsEnum(AvailabilityStatus)
  availability_status: AvailabilityStatus;
}

