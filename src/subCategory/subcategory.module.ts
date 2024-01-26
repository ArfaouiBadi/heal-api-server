/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubCategoryController } from './subcategory.controller';
import { SubCategoryService } from './subcategory.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [SubCategoryController],
  providers: [PrismaService, SubCategoryService, ConfigService],
})
export class SubCategoryModule {}
