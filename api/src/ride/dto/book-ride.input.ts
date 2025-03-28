import { InputType, Field } from '@nestjs/graphql';
import { CartType } from '../entities/ride.entity';

@InputType()
export class BookRideInput {
  @Field(() => String)
  pickup: string;

  @Field(() => String)
  dropoff: string;

  @Field(() => CartType)
  carType: CartType;
}
