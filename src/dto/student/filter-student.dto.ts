import { IsString, IsOptional } from 'class-validator';

export class FilterStudentDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly className?: string;
}
