import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class Ride {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field(() => User, { nullable: true })
  user: User;
  @Field(() => String, { nullable: true })
  pickup: string;
  @Field(() => String, { nullable: true })
  dropoff: string;
  @Field(() => String, { nullable: true })
  carType: string;
  @Field(() => String, { nullable: true })
  fare: string;
  @Field(() => RideStatus, { nullable: true })
  status: RideStatus;
  @Field(() => String, { nullable: true })
  createdAt: string;
  @Field(() => String, { nullable: true })
  updatedAt: string;
}

export enum RideStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(RideStatus, {
  name: 'RideStatus',
  description: 'ride status',
});
