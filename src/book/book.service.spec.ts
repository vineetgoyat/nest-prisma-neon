import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import type { PrismaService } from '../prisma/prisma.service';

const mockPrisma: Partial<Record<string, any>> = {
  book: {
    create: jest.fn(),
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    service = new BookService(mockPrisma as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
