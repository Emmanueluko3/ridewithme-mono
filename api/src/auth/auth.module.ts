import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthResolver, AuthService, JwtService, PrismaService, AccessTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
