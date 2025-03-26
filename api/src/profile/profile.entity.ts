import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  location?: string;

  @Field((type) => User)
  user: User;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  updatedAt: string;
}
