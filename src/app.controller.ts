import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('apirequest')
@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return process.env.DATABASE_HOST;
  }
}
