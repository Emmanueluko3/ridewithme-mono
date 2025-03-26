import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Public } from '../auth/decorators/public.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { UpdateMeInput } from './dto/update-me.input';
import { UserResponse } from './dto/user-response';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Query(() => [User], { name: 'users' })
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.find(id);
  }

  @Query(() => User)
  me(@AuthUser() user: User) {
    return this.userService.findByEmail(user.email);
  }

  @Mutation(() => UserResponse)
  async updateMe(@AuthUser() user: User, @Args('input') input: UpdateMeInput) {
    const updatedUser = await this.userService.updateMe(user.email, input);
    return {
      status: 'success',
      message: 'updated successfully',
      user: updatedUser,
    };
  }
}
