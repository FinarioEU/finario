import { Controller, Get } from '@nestjs/common';

@Controller('trial')
export class TrialController {
  @Get('status') status(){
    // Demo-Phase
    return { phase:'free', daysLeftInPhase:14, dayOfTimeline:0 };
  }
}
