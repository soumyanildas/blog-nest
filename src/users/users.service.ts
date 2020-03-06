import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';
import { EditUserDto } from './edit-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this
      .userModel(createUserDto)
      .save();
    return createUser;
  }

  async find(email: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        email
      })
      .exec();
    return user;
  }

  async get(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .select('-password')
      .exec();
    return user;
  }

  async edit(editUserDto: EditUserDto, id: string): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, editUserDto, { new: true });
    return user;
  }

}
