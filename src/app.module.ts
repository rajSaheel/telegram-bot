import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot/bot.service';
import { BotController } from './bot/bot.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './admin/schemas/user.schema';
import { BotModule } from './bot/bot.module';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [ScheduleModule.forRoot(), AdminModule,ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: '.env'
  }),
MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BotModule],
  controllers: [AppController, BotController, AdminController],
  providers: [AppService, BotService,AdminService]
})
export class AppModule {}
