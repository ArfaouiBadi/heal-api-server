/*
https://docs.nestjs.com/providers#services
*/

import { Body, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategory(): Promise<any> {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async addCategory(@Body() req): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        name: req.name,
      },
    });
    return category;
  }
  async getCategoryNames(): Promise<any> {
    return await this.prisma.category.findMany({
      select: {
        name: true,
      },
    });
  }
}
