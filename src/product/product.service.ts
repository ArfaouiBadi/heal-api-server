import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import * as fs from 'fs';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
/*
interface CreateProductDto {
  productName: string;
  marque: string;
  price: number;
  quantity: number;
  category: { label: string; value: string };
  expirationDate: Date;
  prescription: boolean;
  productCategory: string;
  inventoryStatus: { label: string; value: string };
  image: string;
  userId: string;
  status: string;
  usageInstructions: string;
}


interface UpdateProductDto {
  id: string;
  productName: string;
  marque: string;
  price: number;
  quantity: number;
  expirationDate: Date;
  productCategory: string;
  inventoryStatus: { value: string };
  Image: string;
  userId: string;
  prescription: boolean;
  usageInstructions: string;
}*/
@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getProducts(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          category: true,
          subcategory: true,
          user: true,
        },
      });

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Error fetching products');
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        category: {
          name: category,
        },
      },
    });
  }

  async getProductsByStatus(status: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        status: status,
      },
    });
  }

  async getProductsByUser(userId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        user: true,
      },
      where: {
        userId: userId,
      },
    });
  }

  async addProduct(file: any, req: any): Promise<Product> {
    console.log(req);
    const imageBase64 = `data:${file.mimetype};base64, ${fs.readFileSync(file.path, 'base64')}`;
    const expirationDate = new Date(req.expirationDate);
    console.log(expirationDate);
    try {
      const user = await this.userService.getUserById(req.userId);
      const nbrProductedPerUser = await this.prisma.product.count({
        where: {
          userId: req.userId,
        },
      });

      if (user.plan.autorizedProductNbr < nbrProductedPerUser + 1) {
        throw new Error('You have reached the maximum number of products');
      }
      const product = await this.prisma.product.create({
        data: {
          productName: req.productName,
          marque: req.marque,
          price: parseFloat(req.price),
          quantity: parseInt(req.quantity),
          expirationDate: expirationDate,

          category: {
            connect: {
              id: req.category.value.split(' ')[0],
            },
          },
          usageInstructions: req.usageInstructions,
          prescription: req.prescription === 'true' ? true : false,
          status: req.inventoryStatus.value,
          image: imageBase64,
          reviews: 0,
          subcategory: {
            connect: {
              id: req.category.value.split(' ')[1],
            },
          },
          user: {
            connect: {
              id: req.userId,
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

  async updateProduct(file: any, req: any): Promise<Product> {
    console.log(req);
    const imageBase64 = `data:${file.mimetype};base64, ${fs.readFileSync(file.path, 'base64')}`;
    const expirationDate = new Date(req.expirationDate);
    try {
      const updatedProduct = await this.prisma.product.update({
        where: {
          id: req.id,
        },
        data: {
          productName: req.productName,
          marque: req.marque,
          price: parseFloat(req.price),
          quantity: parseInt(req.quantity),
          expirationDate: expirationDate,
          category: {
            connect: {
              id: req.categoryId,
            },
          },
          usageInstructions: req.usageInstructions,
          prescription: req.prescription === 'true' ? true : false,
          status: req.status,
          image: imageBase64,
          reviews: 0,
          subcategory: {
            connect: {
              id: req.subcategoryId,
            },
          },
          user: {
            connect: {
              id: req.userId,
            },
          },
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

  getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        user: true,
      },
    });
  }
  updateProductStock(productId: string, qty: number): Promise<Product> {
    return this.prisma.product.update({
      where: { id: productId },
      data: {
        quantity: {
          decrement: qty,
        },
      },
    });
  }
  getProductsBySubCategory(subcategoryId: string): Promise<Product[]> {
    console.log(subcategoryId);
    return this.prisma.product.findMany({
      where: {
        subcategory: {
          id: subcategoryId,
        },
      },
      include: {
        category: true,
        subcategory: true,
        user: true,
      },
    });
  }
}
