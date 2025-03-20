import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';
@Module({
  providers: [PrismaService, TeamService, TeamResolver],
})
export class TeamModule {}
