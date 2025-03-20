import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VoteService } from './vote.service';
import { Vote } from '../models/vote.model';

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Mutation(() => Boolean)
  async vote(
    @Args('userId') userId: string,
    @Args('teamId') teamId: string,
    @Args('choice') choice: string,
  ): Promise<boolean> {
    await this.voteService.createVote(userId, teamId, choice);
    return true;
  }

  @Query(() => [Vote])
  async voteResults(@Args('teamId') teamId: string): Promise<any> {
    return this.voteService.getResults(teamId);
  }
}
