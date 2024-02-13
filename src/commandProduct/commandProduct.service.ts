import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
@Injectable()
export class CommandProductService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
  ) {}

  async addCommandProduct(req: any): Promise<any> {
    console.log('req', req);

    try {
      const createdCommandProducts = await Promise.all(
        req.products.map(async (product) => {
          const productExist = await this.prisma.product.findUnique({
            where: { id: product.id },
          });

          if (!productExist) {
            throw new Error(`Product with id '${product.id}' not found.`);
          }

          if (productExist.quantity < product.qty) {
            throw new Error(
              `Product with id '${product.id}' has not enough stock. Stock: ${productExist.quantity}`,
            );
          }

          const createdCommandProduct = await this.prisma.commandProduct.create(
            {
              data: {
                type: 'product',
                user: {
                  connect: { id: req.userId },
                },
                product: {
                  connect: { id: product.id },
                },
                quantity: product.qty,
              },
            },
          );
          if (createdCommandProduct) {
            try {
              const response = await this.productService.updateProductStock(
                product.id,
                product.qty,
              );
              console.log('response', response);
            } catch (error) {
              throw new Error(`Error updating product stock: ${error.message}`);
            }
          }
          return createdCommandProduct;
        }),
      );
      return createdCommandProducts;
    } catch (error) {
      console.error('Error adding command product:', error.message);
      throw error;
    }
  }
  async getAllCommandProduct(): Promise<any> {
    try {
      const commandProducts = await this.prisma.commandProduct.findMany({
        include: {
          product: {
            include: { user: true },
          },
          user: true,
        },
      });
      return commandProducts;
    } catch (error) {
      console.error('Error getting command products:', error.message);
      throw error;
    }
  }
  async getCommandProductsByUserId(userId: string): Promise<any> {
    try {
      const commandProducts = await this.prisma.commandProduct.findMany({
        where: { userId: userId },
        include: { product: true },
      });
      return commandProducts;
    } catch (error) {
      console.error('Error getting command products:', error.message);
      throw error;
    }
  }
  async getProductsByProductUserID(userId: string): Promise<any> {
    try {
      const products = await this.prisma.commandProduct.findMany({
        where: { product: { userId: userId } },
        include: { product: true },
      });
      return products;
    } catch (error) {
      console.error('Error getting products:', error.message);
      throw error;
    }
  }
  async deleteCommandProduct(id: string): Promise<any> {
    try {
      const deletedCommandProduct = await this.prisma.commandProduct.delete({
        where: { id },
      });
      return deletedCommandProduct;
    } catch (error) {
      console.error('Error deleting command product:', error.message);
      throw error;
    }
  }
  async deleteCommandProductsByUserEmail(userEmail: string): Promise<any> {
    try {
      const deletedCommandProducts =
        await this.prisma.commandProduct.deleteMany({
          where: { product: { user: { email: userEmail } } },
        });
      return deletedCommandProducts;
    } catch (error) {
      console.error('Error deleting command products:', error.message);
      throw error;
    }
  }
}
