import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error in getUserById:', error.message);
      throw new Error('Failed to get user by ID');
    }
  }
  async updateUser(id: string, data: any) {
    try {
      console.log(id, data);

      const user = await this.prisma.user.update({
        where: { id: id },
        data: {
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
      });
      return user;
    } catch (error) {
      console.error('Error in updateUser:', error.message);
      throw new Error('Failed to update user');
    }
  }
}
