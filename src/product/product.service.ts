import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateProductDto {
  productName: string;
  marque: string;
  price: number;
  quantity: number;
  expirationDate: Date;
  productCategory: string;
  inventoryStatus: { value: string };
  Image: string;
  userId: string;
}

interface UpdateProductDto extends CreateProductDto {
  id: string;
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

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
    console.log(userId);
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

  async addProduct(req: any): Promise<Product> {
    console.log('hello');
    console.log(req);
    try {
      const product = await this.prisma.product.create({
        data: {
          productName: req.productName,
          marque: req.marque,
          price: req.price,
          quantity: req.quantity,
          expirationDate: req.expirationDate,
          category: {
            connect: {
              id: req.category.value.split(' ')[0],
            },
          },
          prescription: false,
          status: req.inventoryStatus.value,
          image: req.Image,
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

  async updateProduct(req: UpdateProductDto): Promise<Product> {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: {
          id: req.id,
        },
        data: {
          productName: req.productName,
          marque: req.marque,
          price: req.price,
          quantity: req.quantity,
          expirationDate: req.expirationDate,
          category: {
            connect: {
              id: req.productCategory.split(' ')[0],
            },
          },
          prescription: false,
          status: req.inventoryStatus.value,
          image: req.Image,
          reviews: 0,
          subcategory: {
            connect: {
              id: req.productCategory.split(' ')[1],
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

  getProduct(): string {
    return 'get product';
  }
}
