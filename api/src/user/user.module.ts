import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
