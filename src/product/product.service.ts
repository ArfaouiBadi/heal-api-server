import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateProductDto {
  ProductName: string;
  Marque: string;
  price: number;
  Quantity: number;
  ExpirationDate: Date;
  ProductCategory: string;
  inventoryStatus: { value: string }; // Assuming it's an object with a "value" property
  Image: string;
}

interface UpdateProductDto extends CreateProductDto {
  id: string;
}

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

  async addProduct(req: CreateProductDto): Promise<Product> {
    try {
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
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Error creating product');
    }
  }

  async updateProduct(req: UpdateProductDto): Promise<Product> {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: {
          id: req.id,
        },
        data: {
          ProductName: req.ProductName,
          Marque: req.Marque,
          Price: req.price,
          Quantity: req.Quantity,
          ExpirationDate: req.ExpirationDate,
          ProductCategory: req.ProductCategory,
          Status: req.inventoryStatus.value,
          Image: req.Image,
        },
      });
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Error updating product');
    }
  }

  async deleteProduct(id: string): Promise<Product> {
    try {
      const deletedProduct = await this.prisma.product.delete({
        where: {
          id: id,
        },
      });
      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new NotFoundException('Product not found');
    }
  }

  getProduct(): string {
    return 'get product';
  }
}
