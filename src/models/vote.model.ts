import { ObjectType, Field } from '@nestjs/graphql';
import { Team } from 'src/models/team.model'; // Team 타입을 import
import { User } from 'src/models/user.model'; // User 타입을 import

@ObjectType()
export class Vote {
  @Field()
  id: string;

  @Field()
  choice: string;

  @Field(() => Team)
  team: Team;

  @Field(() => User)
  user: User;
}
