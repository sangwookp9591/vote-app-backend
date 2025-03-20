import { ObjectType, Field } from '@nestjs/graphql';
import { TeamMember } from 'src/models/team-member.model'; // TeamMember 모델을 import
import { Vote } from 'src/models/vote.model'; // Vote 모델을 import
import { Team } from 'src/models/team.model'; // Team 모델을 import

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => [TeamMember])
  teams: TeamMember[]; // 사용자가 가입한 팀들

  @Field(() => [Team])
  ownedTeams: Team[]; // 사용자가 소유한 팀들 (관리자 역할)

  @Field(() => [Vote])
  votes: Vote[]; // 사용자가 참여한 투표들
}
