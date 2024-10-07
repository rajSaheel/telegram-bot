import { Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
constructor(private readonly adminService: AdminService) {}
  @Get('users')
  getAllUSers(){
    return this.adminService.getAllUsers()
  }

  @Patch('users:id')
  updateUSer(@Param('id')id:number){ 
    return this.adminService.updateUserStatus(id,true)
  }

  @Delete('users:id')
  deleteUser(@Param('id')id:number){
    return this.adminService.deleteUser(id)
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Google login route
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req) {
    return {
      message: 'Google login successful',
      user: req.user,
    };
  }
}
