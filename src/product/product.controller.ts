import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

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

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Post('addProduct')
  async addProduct(@Body() req: CreateProductDto): Promise<Product> {
    try {
      const product = await this.productService.addProduct(req);
      return product;
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Error adding product');
    }
  }

  @Put()
  async updateProduct(@Body() req): Promise<Product> {
    try {
      const updatedProduct = await this.productService.updateProduct(req);
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Error updating product');
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    console.log(id);
    try {
      const deletedProduct = await this.productService.deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Error deleting product');
    }
  }
}
