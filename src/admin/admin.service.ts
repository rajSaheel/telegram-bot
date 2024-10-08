import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: any): Promise<string> {
    try {
      const payload = { email: user.email, name: user.name };
      return await this.jwtService.signAsync(payload);
    } catch (e) {
      console.error(e);
    }
  }

  // Block or unblock a user
  async updateUserStatus(chatId: number, blocked: boolean): Promise<User> {
    try {
      return await this.userModel
        .findOneAndUpdate({ chatId }, { blocked }, { new: true })
        .exec();
    } catch (e) {
      console.error(e);
    }
  }

  // Delete a user
  async deleteUser(chatId: number): Promise<any> {
    try {
      return this.userModel.findOneAndDelete({ chatId }).exec();
    } catch (e) {
      console.error(e);
    }
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (e) {
      console.error(e);
    }
  }
}
