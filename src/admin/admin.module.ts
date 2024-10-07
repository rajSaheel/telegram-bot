import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),PassportModule.register({ session: false })],
  controllers: [AdminController],
  providers: [AdminService, GoogleStrategy],
})
export class AdminModule {}
