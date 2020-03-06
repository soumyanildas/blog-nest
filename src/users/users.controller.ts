import { Controller, Post, Body, Res, HttpStatus, UseFilters, Put, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { MongoExceptionFilter } from 'src/filters/mongo-exception/mongo-exception.filter';
import { EditUserDto } from './edit-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from './user.decorator';

@Controller()
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Post('users')
  @UseFilters(MongoExceptionFilter)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      error: false,
      message: 'User has been created successfully'
    });
  }

  @Put('user')
  @UseFilters(MongoExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() editUserDto: EditUserDto, @Res() res: any, @AuthUser() user: any) {
    const userResponse = await this.userService.update(editUserDto, user._id);
    if (userResponse) {
      return res.status(HttpStatus.OK).json({
        error: false,
        message: 'User successfully updated'
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      error: true,
      message: 'User not found'
    });
  }

  @Get('user')
  @UseFilters(MongoExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  async get(@Res() res: any, @AuthUser() user: any) {
    console.log('UsersController -> get -> user._id', user);
    const userResponse = await this.userService.get(user._id);
    if (userResponse) {
      return res.status(HttpStatus.OK).json({
        error: false,
        user: userResponse
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      error: true,
      message: 'User not found'
    });
  }

}
