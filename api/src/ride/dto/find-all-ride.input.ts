import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { FilterRideInput } from './filter-ride.input';
import { IsOptional } from 'class-validator';

@InputType()
export class FindAllRideInput {
  @Field(() => SortBy, { nullable: true })
  sortBy?: SortBy;

  @Field(() => SortOrder, { nullable: true })
  sortOrder?: SortOrder;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => FilterRideInput, { nullable: true })
  @IsOptional()
  filters?: FilterRideInput;
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Sort order',
});

export enum SortBy {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(SortBy, {
  name: 'SortBy',
  description: 'Sort by',
});
