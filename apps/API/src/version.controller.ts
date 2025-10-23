// apps/API/src/version.controller.ts

import { Controller, Get } from '@nestjs/common';
import { name as appName, version as appVersion } from '../package.json'; // wichtig: Pfad eine Ebene hoch

@Controller('api') // Klein geschrieben – wichtig!
export class VersionController {
  // Gibt die aktuelle Version der API zurück
  @Get('version')
  getVersion() {
    return {
      name: appName || 'finario-api',
      version: appVersion || '0.0.0',
    };
  }

  // Healthcheck-Endpunkt (für Render und manuelle Tests)
  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      message: 'Finario API läuft 🌸',
    };
  }
}
