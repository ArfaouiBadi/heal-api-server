/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandProduct } from '@prisma/client';
import { CommandProductService } from './commandProduct.service';

@Controller('commandproduct')
export class CommandProductController {
  constructor(private commandeProductService: CommandProductService) {}
  @Post()
  async addCommandProduct(@Body() req: any): Promise<CommandProduct> {
    console.log('req', req);
    return await this.commandeProductService.addCommandProduct(req);
  }
  @Get('all')
  async getAllCommandProduct(): Promise<CommandProduct[]> {
    return await this.commandeProductService.getAllCommandProduct();
  }
  @Get('all/:id')
  async getCommandProductByUserId(
    @Param('id') userId: string,
  ): Promise<CommandProduct[]> {
    return await this.commandeProductService.getCommandProductsByUserId(userId);
  }
  @Get('allProduct/:id')
  async getProductsByProductUserID(
    @Param('id') userId: string,
  ): Promise<CommandProduct[]> {
    return await this.commandeProductService.getProductsByProductUserID(userId);
  }
}
