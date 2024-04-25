import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';
import { PaymentRequestBody } from 'src/types/types';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('/check/product')
  async createCheckoutSessionProduct(
    @Body() requestBody: PaymentRequestBody,
    @Res() res: Response,
  ) {
    try {
      const session =
        await this.paymentService.createCheckoutSessionProduct(requestBody);
      res.status(HttpStatus.OK).json({ url: session.url });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err: err.message });
    }
  }
  @Post('/check/plan')
  async createCheckoutSessionPlan(
    @Body() requestBody: PaymentRequestBody,
    @Res() res: Response,
  ) {
    try {
      const session =
        await this.paymentService.createCheckoutSessionPlan(requestBody);
      res.status(HttpStatus.OK).json({ url: session.url });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err: err.message });
    }
  }
}
