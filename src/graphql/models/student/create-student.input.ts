import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class CreateStudentInput {
  @Field()
  @IsNotEmpty()
  readonly name!: string;

  @Field()
  @IsNotEmpty()
  readonly classId!: string;
}
