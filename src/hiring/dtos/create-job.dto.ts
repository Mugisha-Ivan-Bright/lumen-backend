import { EmploymentType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsEnum(EmploymentType)
  employment_type: EmploymentType;

  @IsOptional()
  @IsInt()
  skillId?: number;
}

