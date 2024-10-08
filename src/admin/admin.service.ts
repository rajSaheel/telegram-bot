import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './schemas/settings.schema';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,private readonly jwtService: JwtService) {}

  async generateToken(user: any): Promise<string>{
    const payload = { email: user.email, name: user.name };
    return await this.jwtService.signAsync(payload);
  }

  // Block or unblock a user
  async updateUserStatus(chatId: number, blocked: boolean): Promise<User> {
    return this.userModel.findOneAndUpdate({ chatId }, { blocked }, { new: true }).exec();
  }

  // Delete a user
  async deleteUser(chatId: number): Promise<any> {
    return this.userModel.findOneAndDelete({ chatId }).exec();
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
