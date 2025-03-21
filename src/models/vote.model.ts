import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/models/user.model'; // User 모델을 import
import { Team } from 'src/models/team.model'; // Team 모델을 import

@ObjectType()
export class Vote {
  @Field()
  id: string;

  @Field()
  teamId: string;

  @Field()
  userId: string;

  @Field()
  choice: string;

  @Field()
  createdAt: Date;

  @Field(() => Team)
  team: Team; // 팀 정보 (Team)

  @Field(() => User)
  user: User; // 사용자 정보 (User)
}
