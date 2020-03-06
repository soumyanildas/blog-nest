import { IsString, IsUrl, IsOptional } from 'class-validator';

export class EditUserDto {

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly userName: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly profilePic: string;

}