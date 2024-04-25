/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandPlan } from '@prisma/client';

import { CommandPlanService } from './commandplan.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('commandplan')
export class CommandPlanController {
  constructor(private commandePlanService: CommandPlanService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addCommandPlan(@Body() req: any): Promise<CommandPlan> {
    console.log('req', req);
    return await this.commandePlanService.addCommandPlan(req);
  }
}
