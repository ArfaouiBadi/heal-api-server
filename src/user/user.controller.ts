import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('User')
  getUser(): string {
    return 'Hello World!';
  }
  @Post('User')
  postUser() {
    return this.userService.postUser();
  }
}
