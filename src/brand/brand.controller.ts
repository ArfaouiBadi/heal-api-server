/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';

import { BrandService } from './brand.service';
import { Brand } from '@prisma/client';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}
  @Get()
  async getAllBrands(): Promise<Brand[]> {
    return await this.brandService.getAllBrands();
  }
  @Post()
  async addBrand(@Body() req): Promise<Brand> {
    return await this.brandService.addBrand(req);
  }
}
