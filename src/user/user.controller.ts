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
import { use } from 'passport';
import { AccesGuard } from 'src/acces/acces.guard';

@Controller('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UseGuards()
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUserRoleandPlan(
    @Body() req,
    @Param('id') id: string,
  ): Promise<User> {
    console.log(req);
    return this.userService.updateUserRoleandPlan(id, req);
  }
  @UseGuards(AccesGuard)
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
