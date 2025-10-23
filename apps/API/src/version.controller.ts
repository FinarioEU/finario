import { Controller, Get } from '@nestjs/common';
import pkg from '../package.json'; // wichtig: Pfad von src/ eine Ebene hoch

@Controller('api')
export class VersionController {
  @Get('version')
  getVersion() {
    return {
      name: (pkg as any).name ?? 'finario-api',
      version: (pkg as any).version ?? '0.0.0',
    };
  }

  @Get('health')
  health() {
    return { status: 'ok', message: 'Finario API is running 🚀' };
  }
}
