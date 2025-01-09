import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class CreateClassInput {
  @Field()
  @IsNotEmpty()
  readonly name: string;
}
