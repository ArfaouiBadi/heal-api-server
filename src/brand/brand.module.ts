import { BrandService } from './brand.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [BrandService, PrismaService, ConfigService],
})
export class BrandModule {}
