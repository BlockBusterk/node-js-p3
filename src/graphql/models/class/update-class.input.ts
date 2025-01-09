import { Field, InputType } from '@nestjs/graphql';
import {IsOptional } from 'class-validator';
@InputType()
export class UpdateClassInput {
  @Field({ nullable: true })
  @IsOptional()
  readonly name: string;
}