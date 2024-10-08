import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/admin/schemas/user.schema';
import { BotSettings, BotSettingsSchema } from 'src/admin/schemas/bot.schema';

@Module({
    imports:[MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{name:BotSettings.name,schema:BotSettingsSchema}])]
})
export class BotModule {}
