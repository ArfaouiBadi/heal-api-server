/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, ConfigService],
})
export class PaymentModule {}
