import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { BotSettings,BotSettingsSchema } from './schemas/bot.schema';
import { AdminBotService } from './adminBot.service';
import {  AdminBotController} from "./adminBot.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{name:BotSettings.name,schema:BotSettingsSchema}]),
    PassportModule.register({ session: false,defaultStrategy:'jwt' }),
    JwtModule.register({
      secret: 'kjsdh98yerb39iugh', 
      signOptions: { expiresIn: '1h' }, 
    })
  ],
  controllers: [AdminController,AdminBotController],
  providers: [AdminService, GoogleStrategy,AdminBotService],
})
export class AdminModule {}
