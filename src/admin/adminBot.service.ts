import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotSettings } from './schemas/bot.schema';

@Injectable()
export class AdminBotService {
  constructor(
    @InjectModel(BotSettings.name) private botModel: Model<BotSettings>,
  ) {}

  async getApiKey(): Promise<BotSettings> {
    try {
      const bot = await this.botModel.find().exec();
      return bot[0];
    } catch (e) {
      console.error(e);
    }
  }

  async getBotSettings(): Promise<BotSettings> {
    try {
      const records = await this.botModel.find().exec();
      return records[0];
    } catch (e) {
      console.error(e);
    }
  }

  async updateBotSettings(settings): Promise<BotSettings> {
    try {
      const currentSettings = await this.botModel
        .findOneAndUpdate(
          { apiKey: settings.apiKey },
          { settings },
          { new: true },
        )
        .exec();
      return currentSettings;
    } catch (e) {
      console.error(e);
    }
  }
}
