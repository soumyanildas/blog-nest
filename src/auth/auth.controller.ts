import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res() res: any) {
    const response = await this.authService.login(authLoginDto);
    console.log('AuthController -> login -> response', response);
    if (response) {
      return res.status(HttpStatus.OK).json({
        error: false,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      error: true,
      message: 'Password mismatch'
    });
  }
}