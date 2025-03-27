import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BookRideInput {
  @Field(() => String)
  pickup: string;

  @Field(() => String)
  dropoff: string;

  @Field(() => String)
  carType: string;
}
