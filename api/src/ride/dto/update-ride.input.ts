import { BookRideInput } from './book-ride.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRideInput extends PartialType(BookRideInput) {
  @Field(() => Int)
  id: number;
}
