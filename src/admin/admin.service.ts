import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './schemas/settings.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Block or unblock a user
  async updateUserStatus(chatId: number, blocked: boolean): Promise<User> {
    return this.userModel.findOneAndUpdate({ chatId }, { blocked }, { new: true }).exec();
  }

  // Delete a user
  async deleteUser(chatId: number): Promise<any> {
    return this.userModel.deleteOne({ chatId }).exec();
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
