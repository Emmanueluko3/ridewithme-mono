import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name: string;

  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
