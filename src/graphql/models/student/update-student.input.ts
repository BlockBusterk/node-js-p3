import { Field, InputType } from '@nestjs/graphql';
import {IsOptional } from 'class-validator';
@InputType()
export class UpdateStudentInput {
  @Field()
  @IsOptional()
  readonly name: string;

  @Field()
  @IsOptional()
  readonly classId: string;
}