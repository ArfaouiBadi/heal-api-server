/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlanController } from './plan.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [PlanController],
  providers: [PlanService, PrismaService, ConfigService],
})
export class PlanModule {}
