import { Controller, Get } from '@nestjs/common';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { name, version } = require('../package.json');

@Controller('api')
export class VersionController {
  @Get('version')
  getVersion() {
    return { name, version };
  }
}
