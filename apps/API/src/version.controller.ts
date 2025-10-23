import { Controller, Get } from '@nestjs/common';
import pkg from '../package.json'; // Pfad: eine Ebene hoch vom src/Ordner

@Controller('api')
export class VersionController {
  @Get('version')
  getVersion() {
    return {
      name: pkg.name || 'finario-api',
      version: pkg.version || '0.0.0',
    };
  }

  @Get('health')
  getApiHealth() {
    return { status: 'ok', message: 'Finario API läuft 🚀' };
  }
}
