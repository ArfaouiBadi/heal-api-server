import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
        include: {
          plan: {
            select: {
              name: true,
              autorizedProductNbr: true,
            },
          },
        },
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
  async updateUserRoleandPlan(id: string, data: any) {
    console.log(data);

    console.log(data.plan.id + ' ' + data.planId + ' ' + data.plan);
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: {
          role: data.role.value || data.role,
          plan: {
            connect: { id: data.plan.id || data.plan || data.planId },
          },
          phone: data.phone,
          email: data.email,
          password: data.password,
          address: data.address,
        },
      });
      return user;
    } catch (error) {
      console.error('Error in updateUser:', error.message);
      throw new Error('Failed to update user');
    }
  }
  async updateUser(id: string, data: any) {
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: {
          role: data.role,
          phone: data.phone,
          email: data.email,
          password: data.password,
          address: data.address,
        },
      });
      return user;
    } catch (error) {
      console.error('Error in updateUser:', error.message);
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id: id },
      });
      return user;
    } catch (error) {
      console.error('Error in deleteUser:', error.message);
      throw new Error('Failed to delete user');
    }
  }
  async getUsers() {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          plan: {
            select: {
              id: true,
              name: true,
              autorizedProductNbr: true,
              updatedAt: true,
            },
          },
        },
      });
      return users;
    } catch (error) {
      console.error('Error in getUsers:', error.message);
      throw new Error('Failed to get users');
    }
  }
  async updateUserRole(id: string, role: string) {
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: {
          role: role,
        },
      });
      return user;
    } catch (error) {
      console.error('Error in updateUserRole:', error.message);
      throw new Error('Failed to update user role');
    }
  }
  async updateUserPlan(id: string, planName: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new Error('User not found for the given id');
    }
    try {
      const plan = await this.prisma.plan.findUnique({
        where: { name: planName },
      });
      if (!plan) {
        throw new Error('Plan not found for the given id');
      }
      const user = await this.prisma.user.update({
        where: { id: id },
        data: {
          plan: {
            connect: { id: plan.id },
          },
        },
      });
      return user;
    } catch (error) {
      console.error('Error in updateUserPlan:', error.message);
      throw new Error('Failed to update user plan');
    }
  }
}
