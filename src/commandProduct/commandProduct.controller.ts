/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
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
}
