import { Injectable } from '@nestjs/common';
import { CronExpression, Cron } from '@nestjs/schedule';
import { BotService } from './bot/bot.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './admin/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    private readonly botService: BotService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  getHello(): string {
    return 'Hello Visitor! You are on Telegram Bot server. Go check out the admin panel.';
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      const subscribers = await this.userModel.find().exec();
      subscribers.forEach(async (subscriber) => {
        if (subscriber.subscribed && !subscriber.blocked) {
          const message = await this.botService.getWeather(subscriber.city);
          await this.botService.sendMessage(subscriber.chatId, message);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
