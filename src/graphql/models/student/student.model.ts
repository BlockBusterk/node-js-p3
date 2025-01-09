import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StudentModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  classId: string;
}
