/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubCategoryController } from './subcategory.controller';
import { SubCategoryService } from './subcategory.service';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy';

@Module({
  imports: [],
  controllers: [SubCategoryController],
  providers: [PrismaService, SubCategoryService, ConfigService, JwtStrategy],
})
export class SubCategoryModule {}
