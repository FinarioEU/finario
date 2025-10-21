import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getRoot() {
    return { status: 'ok', message: 'Finario API is running 🚀' };
  }

  @Get('/health')
  getHealth() {
    return { status: 'ok', message: 'Finario API is running 🚀' };
  }
}
