import { Body, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getProducts(): string {
    return 'products';
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
        user: {},
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
