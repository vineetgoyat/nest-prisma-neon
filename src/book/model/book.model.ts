import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Book {
    @Field()
    'id': string;
}