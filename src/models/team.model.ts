import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/models/user.model'; // User 타입을 import

@ObjectType()
export class Team {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => User)
  owner: User;
}
