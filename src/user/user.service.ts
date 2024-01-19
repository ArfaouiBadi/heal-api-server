import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
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
