import { Field, InputType } from '@nestjs/graphql';
import {IsOptional } from 'class-validator';
@InputType()
export class UpdateStudentInput {
  @Field({ nullable: true })
  @IsOptional()
  readonly name: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly classId: string;
}