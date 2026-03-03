import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdvisoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, content: string, projectId?: number) {
    return this.prisma.advisory.create({
      data: {
        userId,
        content,
        projectId,
      },
    });
  }

  getUserAdvisories(userId: number) {
    return this.prisma.advisory.findMany({
      where: { userId },
      orderBy: { created_at: 'desc' },
    });
  }
}

