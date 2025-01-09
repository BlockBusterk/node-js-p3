import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassModel {
  @Field()
  id: string;

  @Field()
  name: string;
}
