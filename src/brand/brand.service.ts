import { Injectable } from '@nestjs/common';
import { Brand, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getAllBrands(): Promise<Brand[]> {
    try {
      return await this.prisma.brand.findMany();
    } catch (error) {
      // Handle errors, log them, and possibly throw a custom exception
      console.error('Error fetching brands:', error);
      throw new Error('Error fetching brands');
    }
  }

  async addBrand(createBrandDto: Prisma.BrandCreateInput): Promise<Brand> {
    try {
      const brand = await this.prisma.brand.create({
        data: createBrandDto,
      });
      return brand;
    } catch (error) {
      // Handle errors, log them, and possibly throw a custom exception
      console.error('Error creating brand:', error);
      throw new Error('Error creating brand');
    }
  }
}
