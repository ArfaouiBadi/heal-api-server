/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCategory(): Promise<Category[]> {
    return await this.categoryService.getCategory();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addCategory(@Body() req): Promise<Category> {
    return await this.categoryService.addCategory(req);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('names')
  async getCategoryNames(): Promise<any> {
    return await this.categoryService.getCategoryNames();
  }
}
