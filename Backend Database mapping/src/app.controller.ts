import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly _service: AppService) {}

  @Post('/')
  getHello(): string {
    return 'hello world';
  }

  @Get('/PRIMARY')
  async getAllTableName(@Body() data: any) {
    return this._service.getPrimaryData();
  }

  @Get('/SECONDARY')
  async getAllTableName2(@Body() data: any) {
    return this._service.getClientData();
  }
}
