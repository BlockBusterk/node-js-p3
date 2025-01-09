import { Field, InputType } from '@nestjs/graphql';
import {IsOptional } from 'class-validator';
@InputType()
export class UpdateClassInput {
  @Field()
  @IsOptional()
  readonly name: string;
}