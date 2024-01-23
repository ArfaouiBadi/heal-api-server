import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ConfigService } from '@nestjs/config';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [ProductService, ConfigService, PrismaService],
  controllers: [ProductController],
})
export class ProductModule {}
