import { Controller, Get } from '@nestjs/common';
import * as pkg from '../package.json';

@Controller('api')
export class VersionController {
  @Get('version')
  version() {
    // @ts-ignore – TypeScript stört sich an JSON-Import
    const { name, version } = pkg;
    return { name, version };
  }
}
