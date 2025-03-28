import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { CartType, RideStatus } from '../entities/ride.entity';

@InputType()
export class FilterRideInput implements Prisma.RideWhereInput {
  @Field(() => String, { nullable: true })
  pickup?: string;

  @Field(() => String, { nullable: true })
  dropoff: string;

  @Field(() => CartType, { nullable: true })
  carType: CartType;

  @Field(() => RideStatus, { nullable: true })
  @IsOptional()
  status?: RideStatus;
}
