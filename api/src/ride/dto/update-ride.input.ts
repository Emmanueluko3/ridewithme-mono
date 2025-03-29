import { InputType, Field } from '@nestjs/graphql';
import { RideStatus } from '../entities/ride.entity';

@InputType()
export class UpdateRideInput {
  @Field(() => RideStatus)
  status: RideStatus;
}
