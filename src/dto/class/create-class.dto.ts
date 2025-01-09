import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

}
