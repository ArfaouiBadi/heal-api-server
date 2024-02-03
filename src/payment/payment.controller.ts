import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';
import { PaymentRequestBody } from 'src/types/types';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/check')
  async createCheckoutSession(
    @Body() requestBody: PaymentRequestBody,
    @Res() res: Response,
  ) {
    try {
      console.log(requestBody);
      const session =
        await this.paymentService.createCheckoutSession(requestBody);
      res.status(HttpStatus.OK).json({ url: session.url });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err: err.message });
    }
  }
}
