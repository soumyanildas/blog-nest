import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly parentCategory: string;

}