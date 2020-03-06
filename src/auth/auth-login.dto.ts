import { IsNotEmpty, IsEmail, IsString, MinLength, IsLowercase } from 'class-validator';

export class AuthLoginDto {

  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

}