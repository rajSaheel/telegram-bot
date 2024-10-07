import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  chatId: number;

  @Prop({ required: true })
  username: string;

  @Prop({required:true})
  city:string;

  @Prop({default:true})
  subscribed:boolean

  @Prop({ default: false })
  blocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
