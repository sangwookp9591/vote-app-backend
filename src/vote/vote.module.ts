import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoteResolver } from './vote.resolver';
import { VoteService } from './vote.service';
@Module({
  providers: [PrismaService, VoteService, VoteResolver],
})
export class VoteModule {}
