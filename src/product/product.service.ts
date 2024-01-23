import { Body, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }
  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        ProductCategory: category,
      },
    });
  }
  async getProductsByStatus(status: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        Status: status,
      },
    });
  }
  async getProductsByUser(userId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async addProduct(@Body() req: any): Promise<Product> {
    console.log(req);
    const product = await this.prisma.product.create({
      data: {
        ProductName: req.ProductName,
        Marque: req.Marque,
        Price: req.price,
        Quantity: req.Quantity,
        ExpirationDate: req.ExpirationDate,
        ProductCategory: req.ProductCategory,
        Status: req.inventoryStatus.value,
        Image: req.Image,
        Reviews: 0,
        user: {
          connect: {
            id: '65ac63178d7f7bd033f1d6f3',
          },
        },
      },
    });
    return product;
  }
  updateProduct(): string {
    return 'update product';
  }
  deleteProduct(): string {
    return 'delete product';
  }
  getProduct(): string {
    return 'get product';
  }
}
