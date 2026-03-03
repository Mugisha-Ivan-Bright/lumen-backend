import { IsOptional, IsString } from 'class-validator';

export class ApplyJobDto {
  @IsOptional()
  @IsString()
  cover_letter?: string;
}

