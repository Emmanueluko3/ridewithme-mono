import {
  Field,
  ObjectType,
  ID,
  GraphQLISODateTime,
  registerEnumType,
} from '@nestjs/graphql';
import { Profile } from 'src/profile/profile.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  phone?: string;

  @Field((type) => UserType, { nullable: true })
  role?: UserType;

  @Field((type) => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  verifiedAt?: string;

  @Field(() => GraphQLISODateTime)
  updatedAt: string;
}
export enum UserType {
  RIDER = 'RIDER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserType, {
  name: 'UserType',
  description: 'user types',
});
