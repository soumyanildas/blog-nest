import { IsNotEmpty, IsEmail, IsString, MinLength, IsLowercase, IsUrl } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsUrl()
  readonly profilePic: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

}