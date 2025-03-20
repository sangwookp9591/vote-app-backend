import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vote } from '@prisma/client';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async createVote(
    userId: string,
    teamId: string,
    choice: string,
  ): Promise<Vote> {
    return await this.prisma.vote.create({
      data: { userId, teamId, choice },
    });
  }

  async getResults(teamId: string): Promise<any> {
    return await this.prisma.vote.groupBy({
      by: ['choice'],
      where: { teamId },
      _count: true,
    });
  }
}
