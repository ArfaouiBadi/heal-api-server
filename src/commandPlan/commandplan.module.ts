/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CommandPlanService } from './commandplan.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { CommandPlanController } from './commandplan.controller';

@Module({
  imports: [],
  controllers: [CommandPlanController],
  providers: [CommandPlanService, PrismaService, UserService, ConfigService],
})
export class CommandPlanModule {}
