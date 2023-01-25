import { Controller, Get, Post, Req } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('auth/login')
  async login(@Req() req) {
    return req.user;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
