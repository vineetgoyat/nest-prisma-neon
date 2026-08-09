import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { seconds, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>
  ({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: true,
  }),
  PrismaModule,
  BookModule,
  ThrottlerModule.forRoot({
    throttlers : [
      {
        name : 'default',
      ttl : seconds(60),
      limit : 3
      }
    ]
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
