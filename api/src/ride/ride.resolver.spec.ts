import { Test, TestingModule } from '@nestjs/testing';
import { RideResolver } from './ride.resolver';
import { RideService } from './ride.service';

describe('RideResolver', () => {
  let resolver: RideResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RideResolver, RideService],
    }).compile();

    resolver = module.get<RideResolver>(RideResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
