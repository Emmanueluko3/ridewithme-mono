import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMeInput } from './dto/update-me.input';

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
      throw new NotFoundException(`User not found`);
    }

    return this.prisma.user.update({
      where: { email },
      data: {
        name: updateMeInput.name,
        phone: updateMeInput.phone,
        type: updateMeInput.userType,
        profile: {
          upsert: {
            create: {
              bio: updateMeInput.profile?.bio,
              location: updateMeInput.profile?.location,
            },
            update: {
              bio: updateMeInput.profile?.bio,
              location: updateMeInput.profile?.location,
            },
          },
        },
      },
      include: { profile: true },
    });
  }
}
