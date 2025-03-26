import { InputType, Field } from '@nestjs/graphql';
import { UpdateProfileInput } from './update-profile.input';
import { UserType } from '../user.entity';

@InputType()
export class UpdateMeInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => UserType, { nullable: true })
  userType?: UserType;

  @Field(() => UpdateProfileInput, { nullable: true })
  profile?: UpdateProfileInput;
}
