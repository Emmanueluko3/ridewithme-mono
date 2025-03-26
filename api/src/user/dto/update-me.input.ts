import { InputType, Field } from '@nestjs/graphql';
import { UpdateProfileInput } from './update-profile.input';

@InputType()
export class UpdateMeInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field((type) => UpdateProfileInput, { nullable: true })
  profile?: UpdateProfileInput;
}
