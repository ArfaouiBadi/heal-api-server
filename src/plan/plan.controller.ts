/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {}
  @Post()
  async addPlan(@Body() req: any): Promise<any> {
    return await this.planService.addPlan(req);
  }
  @Get(':name')
  async getPlanByName(@Param('name') req: string): Promise<any> {
    return await this.planService.getPlanByName(req);
  }
}
