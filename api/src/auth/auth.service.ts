import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginInput } from './dto/login-in.input';
import { RegisterInput } from './dto/register.input';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async registerUser(registerInput: RegisterInput) {
    const hashedPassword = await hash(registerInput.password);

    const existingUserWithEmail = await this.prisma.user.findFirst({
      where: { email: registerInput.email },
    });

    if (existingUserWithEmail) {
      throw new ConflictException('Email Already Exist');
    }

    const user = await this.prisma.user.create({
      data: {
        email: registerInput.email,
        name: registerInput.name,
        phone: registerInput.phone,
        hashedPassword,
      },
    });

    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async loginUser(loginInput: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginInput.email },
    });

    if (!user || !(await verify(user.hashedPassword, loginInput.password))) {
      throw new ForbiddenException('User Credentials Incorrect');
    }

    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async logout(userId: number) {
    //todo destroy token after jwt token track is implemented
    await this.prisma.user.updateMany({
      where: { id: userId, hashedRefreshToken: { not: null } },
      data: { hashedRefreshToken: null },
    });
    return true;
  }

  async createToken(userId: number, email: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      { expiresIn: '10d', secret: this.configService.get('JWT_SECRET') },
    );

    const refreshToken = this.jwtService.sign(
      {
        accessToken,
        email,
        userId,
      },
      { expiresIn: '10d', secret: this.configService.get('JWT_SECRET') },
    );

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);

    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }
}
