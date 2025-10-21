import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class VersionController {
  @Get('version')
  getVersion() {
    return { name: 'Finario API', version: '1.0.0' };
  }
}
