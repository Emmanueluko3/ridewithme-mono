import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookRideInput } from './dto/book-ride.input';
import { UpdateRideInput } from './dto/update-ride.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllRideInput } from './dto/find-all-ride.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class RideService {
  constructor(private readonly prisma: PrismaService) {}

  async bookRide(id: number, bookRideInput: BookRideInput) {
    const existingRide = await this.prisma.ride.findFirst({
      where: { userId: id, status: 'PENDING' },
    });

    if (existingRide) {
      throw new BadRequestException(
        'You already have a pending ride. Complete or cancel it before booking a new one.',
      );
    }

    const { pickup, dropoff, carType } = bookRideInput;
    if (pickup === dropoff) {
      throw new BadRequestException('Pickup and drop-off cannot be the same.');
    }

    const fareRates = { standard: 5, premium: 10, luxury: 20 };
    const fare = (fareRates[carType] || fareRates['standard']) * 10;

    return this.prisma.ride.create({
      data: { user: { connect: { id } }, pickup, dropoff, carType, fare },
    });
  }

  async getBookedRide(userId: number) {
    const ride = await this.prisma.ride.findFirst({
      where: { userId, status: 'PENDING' },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!ride) throw new NotFoundException('Ride not found');

    return ride;
  }

  async findAllRide(userId: number, params?: FindAllRideInput) {
    const {
      sortBy = 'updatedAt',
      sortOrder = 'desc',
      page = 1,
      limit = 30,
      filters = {},
    } = params || {};

    const where: Prisma.RideWhereInput = {
      AND: [{ userId }, filters],
    };

    const orderBy: Prisma.RideOrderByWithRelationInput = {
      [sortBy]: sortOrder as 'asc' | 'desc',
    };

    const skip = (page - 1) * limit;

    const [rides, totalCount] = await Promise.all([
      this.prisma.ride.findMany({
        where,
        include: {
          user: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.ride.count({ where }),
    ]);

    return {
      rides,
      totalCount,
    };
  }

  async findOneRide(id: number) {
    const ride = await this.prisma.ride.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!ride) throw new NotFoundException('Ride not found');
    return ride;
  }

  async update(userId: number, id: number, updateRideInput: UpdateRideInput) {
    const ride = await this.prisma.ride.update({
      where: { id, userId },
      data: { status: updateRideInput.status },
      include: {
        user: true,
      },
    });

    if (!ride) throw new NotFoundException('Ride not found');

    return ride;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
}
