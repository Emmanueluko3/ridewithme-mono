import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RideService } from './ride.service';
import { Ride } from './entities/ride.entity';
import { BookRideInput } from './dto/book-ride.input';
import { UpdateRideInput } from './dto/update-ride.input';
import { Rides } from './entities/rides.entity';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

@Resolver(() => Ride)
export class RideResolver {
  constructor(private readonly rideService: RideService) {}

  @Mutation(() => Ride)
  async bookRide(
    @AuthUser() user: { userId: number; email: string },
    @Args('bookRideInput') bookRideInput: BookRideInput,
  ) {
    return await this.rideService.bookRide(user.userId, bookRideInput);
  }

  @Query(() => Rides)
  async rides() {
    return await this.rideService.findAllRide();
  }

  @Query(() => Ride)
  async ride(@Args('id', { type: () => Int }) id: number) {
    return await this.rideService.findOneRide(id);
  }

  @Mutation(() => Ride)
  async updateRide(@Args('updateRideInput') updateRideInput: UpdateRideInput) {
    return await this.rideService.update(updateRideInput.id, updateRideInput);
  }

  @Mutation(() => Ride)
  async removeRide(@Args('id', { type: () => Int }) id: number) {
    return await this.rideService.remove(id);
  }
}
