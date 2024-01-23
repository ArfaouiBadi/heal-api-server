import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule, ProductModule],
})
export class AppModule {}
