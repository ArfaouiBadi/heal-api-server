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
      throw error; // Rethrow the error if needed
    }
  }
}
