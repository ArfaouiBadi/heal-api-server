import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Put('update/:id')
  async update(@Body() req, @Param('id') id: string): Promise<User> {
    return this.userService.updateUser(id, req);
  }

  @Put('update/plan/:id')
  async updateUserPlan(@Body() req, @Param('id') id: string): Promise<User> {
    return this.userService.updateUserPlan(id, req.planId);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
