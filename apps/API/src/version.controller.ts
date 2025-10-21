import { Controller, Get } from '@nestjs/common';
import pkg from '../package.json' assert { type: 'json' };

@Controller('api')
export class VersionController {
  @Get('version')
  getVersion() {
    const { name, version } = pkg;
    return { name, version };
  }
}
