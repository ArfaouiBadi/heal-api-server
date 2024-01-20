import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule],
})
export class AppModule {}
