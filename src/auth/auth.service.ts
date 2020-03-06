
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(authLoginDto: AuthLoginDto) {
    const userRespone = await this.usersService.find(authLoginDto.email);
    if (userRespone) {
      const isPasswordValid = await bcrypt.compare(authLoginDto.password, userRespone.password);
      if (isPasswordValid) {
        const payload = {
          _id: userRespone._id,
          email: userRespone.email,
          name: userRespone.name,
          userName: userRespone.userName,
          profilePic: userRespone.profilePic,
          isActive: userRespone.isActive
        };
        return {
          accessToken: this.jwtService.sign(payload),
          _id: userRespone._id,
          email: userRespone.email,
          name: userRespone.name,
          userName: userRespone.userName,
          profilePic: userRespone.profilePic,
          isActive: userRespone.isActive
        };
      }
      return false;
    }
  }
}
