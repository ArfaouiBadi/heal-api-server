/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandProduct } from '@prisma/client';
import { CommandProductService } from './commandProduct.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('commandproduct')
export class CommandProductController {
  constructor(private commandeProductService: CommandProductService) {}
  @Post()
  async addCommandProduct(@Body() req: any): Promise<CommandProduct> {
    return await this.commandeProductService.addCommandProduct(req);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllCommandProduct(): Promise<CommandProduct[]> {
    return await this.commandeProductService.getAllCommandProduct();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('all/:id')
  async getCommandProductByUserId(
    @Param('id') userId: string,
  ): Promise<CommandProduct[]> {
    return await this.commandeProductService.getCommandProductsByUserId(userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('allProduct/:id')
  async getProductsByProductUserID(
    @Param('id') userId: string,
  ): Promise<CommandProduct[]> {
    return await this.commandeProductService.getProductsByProductUserID(userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async deleteCommandProduct(@Param('id') id: string): Promise<CommandProduct> {
    return await this.commandeProductService.deleteCommandProduct(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteAll/:id')
  async deleteAllCommandProduct(
    @Param('id') id: string,
  ): Promise<CommandProduct> {
    return await this.commandeProductService.deleteCommandProductsByUserEmail(
      id,
    );
  }
}
