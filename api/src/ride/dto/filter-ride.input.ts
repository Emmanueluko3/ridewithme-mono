import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { RideStatus } from '../entities/ride.entity';

@InputType()
export class FilterRideInput implements Prisma.RideWhereInput {
  @Field(() => String, { nullable: true })
  pickup?: string;

  @Field(() => String, { nullable: true })
  dropoff: string;

  @Field(() => String, { nullable: true })
  carType: string;

  @Field(() => RideStatus, { nullable: true })
  @IsOptional()
  status?: RideStatus;
}
