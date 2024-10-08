import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ session: false,defaultStrategy:'jwt' }),
    JwtModule.register({
      secret: 'kjsdh98yerb39iugh', 
      signOptions: { expiresIn: '1h' }, 
    })
  ],
  controllers: [AdminController],
  providers: [AdminService, GoogleStrategy],
})
export class AdminModule {}
