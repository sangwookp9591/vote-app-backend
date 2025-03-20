import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, ownerId: string): Promise<Team> {
    return await this.prisma.team.create({
      data: {
        name,
        ownerId,
      },
    });
  }

  async findAll(): Promise<Team[]> {
    return await this.prisma.team.findMany();
  }

  async joinTeam(userId: string, teamId: string): Promise<void> {
    await this.prisma.teamMember.create({
      data: { userId, teamId },
    });
  }
}
