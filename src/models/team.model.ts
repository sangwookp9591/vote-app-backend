import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/models/user.model'; // User 모델을 import
import { TeamMember } from 'src/models/team-member.model'; // TeamMember 모델을 import
import { Vote } from 'src/models/vote.model'; // Vote 모델을 import

@ObjectType()
export class Team {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  ownerId: string; // ownerId 추가

  @Field(() => User)
  owner: User; // 팀의 소유자 정보 (User)

  @Field(() => [TeamMember])
  members: TeamMember[]; // 팀에 속한 멤버들

  @Field(() => [Vote])
  votes: Vote[]; // 팀의 투표들
}
