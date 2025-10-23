import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // /health -> OHNE /api (für Uptime/Browser-Check)
  @Get('health')
  getHealth() {
    return { status: 'ok', message: 'Finario API is running 🚀' };
  }
}
