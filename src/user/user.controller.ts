import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('User')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
  @Put(':id')
  async updateUser(@Body() req, @Param('id') id: string): Promise<User> {
    console.log(req);
    return this.userService.updateUser(id, req);
  }
}
