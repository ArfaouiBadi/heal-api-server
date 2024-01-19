import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('hello')
  getUser(): string {
    return 'Hello World!';
  }
  @Post()
  postUser() {
    return this.userService.postUser();
  }
}
