import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { UpdateMeInput } from './dto/update-me.input';
import { GraphQLError } from 'graphql';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async find(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
      include: {
        profile: true,
      },
    });
  }

  async updateMe(email: string, updateMeInput: UpdateMeInput) {
    const foundUser = await this.findByEmail(email);

    if (!foundUser) {
      throw new GraphQLError(`User not found`);
    }

    return this.prisma.user.update({
      where: { email },
      data: {
        name: updateMeInput.name,
        phone: updateMeInput.phone,
        profile: updateMeInput.profile
          ? {
              update: {
                bio: updateMeInput.profile.bio,
                location: updateMeInput.profile.location,
              },
            }
          : undefined,
      },
      include: { profile: true },
    });
  }
}
