import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  readonly name?: string;
  
}
