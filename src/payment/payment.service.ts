import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/types/types';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('API_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCheckoutSession(products: any) {
    try {
      const line_items = await Promise.all(
        products.map((item: Product) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.productName,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.qty,
          };
        }),
      );

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: `${this.configService.get<string>('CLIENT')}success`,
        cancel_url: `${this.configService.get<string>('CLIENT')}cancel`,
      });

      return session;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
