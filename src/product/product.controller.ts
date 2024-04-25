import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import * as multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

const storage = multer.memoryStorage();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const upload = multer({ storage: storage });

/*interface CreateProductDto {
  ProductName: string;
  Marque: string;
  price: number;
  Quantity: number;
  ExpirationDate: Date;
  ProductCategory: string;
  inventoryStatus: { value: string };
  Image: string;
}
*/
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getProductsByUser(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.getProductsByUser(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('addProduct')
  @UseInterceptors(FileInterceptor('file'))
  async addProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: any,
  ): Promise<Product> {
    try {
      console.log(req);
      const product = await this.productService.addProduct(file, req);
      return product;
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Error adding product');
    }
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async updateProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() req,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productService.updateProduct(file, req);
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Error updating product');
    }
  }
  @UseGuards(AuthGuard('jwt'))
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

  @Get('subcategory/:subcategory') // Update the parameter name here
  async getProductsBySubCategory(
    @Param('subcategory') subcategory: string, // Keep the parameter name consistent
  ): Promise<Product[]> {
    return await this.productService.getProductsBySubCategory(subcategory);
  }
}
