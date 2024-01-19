import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mongodb+srv://arfaouibadi19:EQuMSwMPHIdy127r@cluster0.m4bsgzs.mongodb.net/Heal',
        },
      },
    });
  }
}
