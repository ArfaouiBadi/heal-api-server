/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';
import { Subcategory } from '@prisma/client';

@Controller('subcategory')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}
  @Get()
  async getSubCategory(): Promise<Subcategory[]> {
    return await this.subCategoryService.getSubCategory();
  }
  @Post()
  async addSubCategory(@Body() req): Promise<Subcategory> {
    return await this.subCategoryService.addSubCategory(req);
  }
}
