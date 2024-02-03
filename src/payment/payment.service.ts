import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'src/types/types';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(configService.get<string>('API_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCheckoutSessionProduct(products: any) {
    console.log(products);
    try {
      const line_items = await Promise.all(
        products.map((item: Product) => {
          console.log(item);
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
        success_url: `${this.configService.get<string>('CLIENT')}afterpayment/product/success`,
        cancel_url: `${this.configService.get<string>('CLIENT')}cart`,
      });
      if (!session) {
        throw new Error('Could not create session');
      }
      console.log(session);
      return session;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async createCheckoutSessionPlan(products: any) {
    console.log(products);
    try {
      const line_items = await Promise.all(
        products.map((item: any) => {
          console.log(item);
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.plan.productName,
              },
              unit_amount: item.plan.price * 100,
            },
            quantity: 1,
          };
        }),
      );
      console.log(line_items);

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: `${this.configService.get<string>('CLIENT')}afterpayment/plan/success`,
        cancel_url: `${this.configService.get<string>('CLIENT')}cart`,
      });
      if (!session) {
        throw new Error('Could not create session');
      }
      console.log(session);
      return session;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
