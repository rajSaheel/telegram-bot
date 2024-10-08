import { Body, Controller, Delete, Get,Patch, Param, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
constructor(private readonly adminService: AdminService) {}
  @Get('users')
  getAllUSers(){
    return this.adminService.getAllUsers();
  }

  @Patch('users/:chatId')
  updateUser(@Param('chatId')chatId:number,@Body() body){
    const blocked = body.blocked;
    return this.adminService.updateUserStatus(chatId,blocked);
  }

  @Delete('users/:chatId')
  deleteUser(@Param('chatId')chatId:number){
    return this.adminService.deleteUser(chatId);
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req,@Res() res) {
    try {
      const user = req.user;
      const token = await this.adminService.generateToken(user);
      return res.redirect(`${process.env.FRONTEND_APP}/login?token=${token}`);
    } catch (e) {
      return { message: 'Failed to Login', status: 401 };
    }
  }

}
