import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return 'Finario API';
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', message: 'Finario API is running 🚀' };
  }
}
