import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Ride } from './ride.entity';
@ObjectType()
export class Rides {
  @Field(() => [Ride])
  rides: Ride[];

  @Field(() => Int)
  totalCount: number;
}
