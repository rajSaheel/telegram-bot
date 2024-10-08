import { Injectable } from '@nestjs/common';
import { CronExpression , Cron } from '@nestjs/schedule';
import { BotService } from './bot/bot.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './admin/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(private readonly botService:BotService,@InjectModel(User.name) private userModel:Model<User>){}
  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async handleCron(){
    try{
      const subscribers = await this.userModel.find()
      subscribers.forEach(async(subscriber,index)=>{
        if(subscriber.subscribed && !subscriber.blocked) {
          const message = await this.botService.getWeather(subscriber.city)
          await this.botService.sendMessage(subscriber.chatId,message)
        }
      })
    }catch (e){
      console.log(e)
    }
    
  }

}
