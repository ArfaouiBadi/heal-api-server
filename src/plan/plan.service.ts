import { Injectable, NotFoundException } from '@nestjs/common';
import { Plan } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async addPlan(req): Promise<Plan> {
    return await this.prisma.plan.create({
      data: {
        name: req.name,
        price: req.price,
        autorizedProductNbr: req.autorizedProductNbr,
      },
    });
  }

  async getPlanByName(name: string): Promise<Plan> {
    const plan = await this.prisma.plan.findUnique({
      where: { name },
    });

    if (!plan) {
      throw new NotFoundException(`Plan with name '${name}' not found.`);
    }

    return plan;
  }
}
