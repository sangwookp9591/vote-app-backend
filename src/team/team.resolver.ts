import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { Team } from '../models/team.model';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team)
  async createTeam(
    @Args('name') name: string,
    @Args('ownerId') ownerId: string,
  ) {
    return this.teamService.create(name, ownerId);
  }

  @Query(() => [Team])
  async teams() {
    return this.teamService.findAll();
  }

  @Mutation(() => Boolean)
  async joinTeam(
    @Args('userId') userId: string,
    @Args('teamId') teamId: string,
  ): Promise<boolean> {
    await this.teamService.joinTeam(userId, teamId);
    return true;
  }
}
