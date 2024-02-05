import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ConfigService } from '@nestjs/config';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [ProductService, ConfigService, PrismaService, UserService],
  controllers: [ProductController],
})
export class ProductModule {}
