/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async getCategory(): Promise<Category[]> {
    return await this.categoryService.getCategory();
  }
  @Post()
  async addCategory(@Body() req): Promise<Category> {
    return await this.categoryService.addCategory(req);
  }
  @Get('names')
  async getCategoryNames(): Promise<any> {
    return await this.categoryService.getCategoryNames();
  }
}
