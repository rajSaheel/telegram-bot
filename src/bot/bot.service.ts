import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import axios  from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/admin/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class BotService implements OnModuleInit {
  private readonly token: string = process.env.TELEGRAM_BOT_TOKEN;
  private bot: TelegramBot;
  private readonly apiKey:string = process.env.WEATHER_API_KEY;
  private readonly uri: string = `http://api.weatherapi.com/v1/forecast.json?days=1&aqi=no&alerts=no&key=${this.apiKey}`;
  protected welcomeMsg:string = `Welcome to hRituBot! Type /subscribe [city] to receive daily weather updates.\ne.g /subscribe London`;
  constructor(@InjectModel(User.name) private userModel:Model<User>){

  }
  onModuleInit() {
    this.bot = new TelegramBot(this.token, { polling: true });
    // Handle /start command
    this.bot.onText(/\/start/, (msg) => {
      this.bot.sendMessage(msg.chat.id, this.welcomeMsg);
    });

    // Handle /subscribe command
    this.bot.onText(/\/subscribe (.+)/, async(msg, match) => {
      if(match[1]=="") this.bot.sendMessage(msg.chat.id,"Missing City Name")
      const chatId = msg.chat.id;
      const username = msg.chat.username || msg.chat.first_name || 'Anonymous';
      const city = match[1];
      const user = await this.userModel.findOne({ chatId });
      if (!user) {
        const newUser = new this.userModel({ chatId, username,city});
        await newUser.save();
        this.bot.sendMessage(chatId, `Welcome ${username}! You have subscribed to daily weather updates for ${city}. \nType /unsubscribe to unsubscribe.\n To change the city just subscribe again with new city.`);
      } else {
        if (user.city !== city){
          await this.userModel.findOneAndUpdate({chatId},{city})
          this.bot.sendMessage(chatId, `Hello ${username}, welcome back! You have successfully subscribed and updated the city`);  
        }else
        this.bot.sendMessage(chatId, `Hello ${username}, welcome back! Glad to see you again`);
        
      }
    });

    // Handle /unsubscribe command
    this.bot.onText(/\/unsubscribe/, async(msg) => {
      const chatId = msg.chat.id
      const user = await this.userModel.findOne({chatId})
      if (user){
        await this.userModel.findOneAndUpdate({chatId},{subscribed:true})
        this.bot.sendMessage(msg.chat.id, 'You have unsubscribed from daily weather updates. We hope to see you again');
      }else{
        this.bot.sendMessage(msg.chat.id,"You have not subscribed yet to any weather updates.")
      }
    });
  }

  async getWeather(city:string):Promise<string> {
    const url = `${this.uri}&q=${city}`;
    const response = await axios.get(url);
    const weatherData = response.data;
    return `The weather in ${city} is currently ${weatherData.current.condition.text} having tempearture ${weatherData.current.temp_c}°C with max temperature ${weatherData.forecast.forecastday[0].day.maxtemp_c}°C and min temperature ${weatherData.forecast.forecastday[0].day.mintemp_c}°C`;
  }

  async sendMessage(chatId: number, message: string) {
    await this.bot.sendMessage(chatId, message);
  }

}



