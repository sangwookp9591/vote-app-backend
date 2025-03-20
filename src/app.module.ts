import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TeamResolver } from './team/team.resolver';
import { VoteResolver } from './vote/vote.resolver';
import { TeamService } from './team/team.service';
import { VoteService } from './vote/vote.service';
import { VoteModule } from './vote/vote.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      playground: process.env.ENV === 'dev',
      context: ({ req }) => ({ request: req }),
    }),
    PrismaModule,
    UserModule,
    VoteModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService, TeamResolver, VoteResolver, TeamService, VoteService],
})
export class AppModule {}
