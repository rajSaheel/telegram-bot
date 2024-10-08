import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BotSettings extends Document {
  @Prop({ required: true })
  apiKey: string;

  @Prop({ required: false })
  botDescription: string;

  @Prop({ required: true,unique:true })
  botName: string;

  @Prop({ required: false })
  about: string;
}

export const BotSettingsSchema = SchemaFactory.createForClass(BotSettings);
