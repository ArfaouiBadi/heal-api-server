import { PaymentModule } from './payment/payment.module';
import { BrandModule } from './brand/brand.module';
import { SubCategoryModule } from './subCategory/subcategory.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    PaymentModule,
    BrandModule,
    SubCategoryModule,
    CategoryModule,
    PrismaModule,
    UserModule,
    AuthModule,
    ProductModule,
    BrandModule,
  ],
})
export class AppModule {}
