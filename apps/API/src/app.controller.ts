import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: 'Finario API läuft 🚀' };
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', message: 'Finario API is running 🚀' };
  }
}
