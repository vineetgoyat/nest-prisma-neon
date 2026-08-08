import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { join } from 'generated/prisma/internal/prismaNamespaceBrowser';
import { ApolloDriver } from 'node_modules/@nestjs/apollo/dist/drivers/apollo.driver';
import { ApolloDriverConfig } from 'node_modules/@nestjs/apollo/dist/interfaces/apollo-driver-config.interface';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),PrismaModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
