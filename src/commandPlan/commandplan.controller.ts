/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { CommandPlan } from '@prisma/client';

import { CommandPlanService } from './commandplan.service';

@Controller('commandplan')
export class CommandPlanController {
  constructor(private commandePlanService: CommandPlanService) {}
  @Post()
  async addCommandPlan(@Body() req: any): Promise<CommandPlan> {
    console.log('req', req);
    return await this.commandePlanService.addCommandPlan(req);
  }
}
