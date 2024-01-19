import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}
  async postUser() {
    const User = await this.prisma.user.create({
      data: {
        email: 'Arfaoui Badii',
        password: '123456789',
      },
    });
    return User;
  }
}
