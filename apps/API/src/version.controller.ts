import { Controller, Get } from '@nestjs/common';
// wichtig: eine Ebene hoch aus src/
import * as pkg from '../package.json';

@Controller('api')
export class VersionController {
  // /api/version -> von der Web-App benutzt
  @Get('version')
  getVersion() {
    return { name: (pkg as any).name ?? 'finario-api', version: (pkg as any).version ?? '0.0.0' };
  }
}
