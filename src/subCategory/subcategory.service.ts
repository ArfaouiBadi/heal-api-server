/*
https://docs.nestjs.com/providers#services
*/

import { Body, Injectable } from '@nestjs/common';
import { Subcategory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}
  async getSubCategory(): Promise<Subcategory[]> {
    return await this.prisma.subcategory.findMany({
      include: {
        category: true,
      },
    });
  }

  async addSubCategory(
    @Body() req: { name: string; categoryId: string },
  ): Promise<Subcategory> {
    try {
      const subCategory = await this.prisma.subcategory.create({
        data: {
          name: req.name,
          category: {
            connect: {
              id: req.categoryId,
            },
          },
        },
      });
      return subCategory;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error creating subcategory:', error);
      throw new Error('Failed to create subcategory');
    }
  }
}
