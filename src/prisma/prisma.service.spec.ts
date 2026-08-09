import { Test, TestingModule } from '@nestjs/testing';

// Simulate the generated Prisma client being unavailable in this environment.
jest.mock('../../generated/prisma/client', () => {
  throw new Error('generated client unavailable');
}, { virtual: true });

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should initialize a fallback client when the Prisma runtime is unavailable', async () => {
    await service.onModuleInit();

    expect(service['_client']).toBeDefined();
    expect(typeof service['_client'].$connect).toBe('function');
    expect(typeof service['_client'].$disconnect).toBe('function');
    expect(typeof service['_client'].book.findMany).toBe('function');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
