import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, ConfigService, JwtService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
