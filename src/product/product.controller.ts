/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('all')
  getProducts(): string {
    return this.productService.getProducts();
  }
  @Post('addProduct')
  async addProduct(@Body() req: any): Promise<Product> {
    console.log(req);
    return this.productService.addProduct(req);
  }
}
