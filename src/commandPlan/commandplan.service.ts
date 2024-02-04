/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommandPlanService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}
  async addCommandPlan(req: any): Promise<any> {
    const plan = await this.prisma.plan.findUnique({
      where: { name: req.planName },
    });
    if (!plan) {
      throw new Error(`Plan with name '${req.planName}' not found.`);
    }
    const createdCommandPlan = await this.prisma.commandPlan.create({
      data: {
        type: 'plan',
        user: {
          connect: { id: req.userId },
        },
        plan: {
          connect: { id: plan.id },
        },
      },
    });
    if (createdCommandPlan) {
      console.log('req.userId', req.userId + 'plan.name', plan.name);
      try {
        const response = await this.userService.updateUserPlan(
          req.userId,
          plan.name,
        );
        console.log('response', response);
      } catch (error) {
        throw new Error(`Error updating user plan: ${error.message}`);
      }
    }
    return createdCommandPlan;
  }
}
