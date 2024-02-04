/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CommandProductService } from './commandProduct.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CommandProductController } from './commandProduct.controller';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [CommandProductController],
  providers: [
    CommandProductService,
    PrismaService,
    ProductService,
    ConfigService,
    UserService,
  ],
})
export class CommandProductModule {}
