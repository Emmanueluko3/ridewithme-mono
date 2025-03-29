import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RideService } from './ride.service';
import { Ride } from './entities/ride.entity';
import { BookRideInput } from './dto/book-ride.input';
import { UpdateRideInput } from './dto/update-ride.input';
import { Rides } from './entities/rides.entity';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { FindAllRideInput } from './dto/find-all-ride.input';

@Resolver(() => Ride)
export class RideResolver {
  constructor(private readonly rideService: RideService) {}

  @Mutation(() => Ride)
  async bookRide(
    @AuthUser() user: { userId: number; email: string },
    @Args('input') input: BookRideInput,
  ) {
    return await this.rideService.bookRide(user.userId, input);
  }

  @Query(() => Ride)
  async getBookedRide(@AuthUser() user: { userId: number; email: string }) {
    return await this.rideService.getBookedRide(user.userId);
  }

  @Query(() => Rides)
  async rides(
    @AuthUser() user: { userId: number; email: string },
    @Args('params', { nullable: true }) params?: FindAllRideInput,
  ) {
    return await this.rideService.findAllRide(user.userId, params);
  }

  @Query(() => Ride)
  async ride(@Args('id', { type: () => Int }) id: number) {
    return await this.rideService.findOneRide(id);
  }

  @Mutation(() => Ride)
  async updateRide(
    @AuthUser() user: { userId: number; email: string },
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateRideInput,
  ) {
    return await this.rideService.update(user.userId, id, input);
  }

  @Mutation(() => Ride)
  async removeRide(@Args('id', { type: () => Int }) id: number) {
    return await this.rideService.remove(id);
  }
}
