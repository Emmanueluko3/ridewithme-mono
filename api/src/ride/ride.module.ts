import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideResolver } from './ride.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RideResolver, RideService, PrismaService],
})
export class RideModule {}
