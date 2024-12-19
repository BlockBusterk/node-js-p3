import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  
  @IsOptional()
  @IsString()
  readonly classId?: string;

  
}
