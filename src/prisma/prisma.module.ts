import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    { provide: 'PrismaService', useExisting: PrismaService },
  ],
  exports: [PrismaService, 'PrismaService'],
})
export class PrismaModule {}
