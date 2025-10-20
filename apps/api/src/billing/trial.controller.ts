import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { introPrice, GROSS_PRICES, type Plan } from './pricing';
import { mailQueue } from '../queue/queues';

type TrialPhases = {
  trialDays: number;
  introDays: number;
  introPrice: number;
  normalPrice: number;
};

const DAY = 24*60*60*1000;

function calcPhase(trialStart: Date){
  const day = Math.floor((Date.now() - trialStart.getTime()) / DAY);
  let phase: 'free'|'intro'|'normal' = 'free';
  let daysLeftInPhase = Math.max(0, 14 - day);
  if(day >= 14 && day < 28){ phase = 'intro'; daysLeftInPhase = Math.max(0, 28 - day); }
  if(day >= 28){ phase = 'normal'; daysLeftInPhase = 0; }
  return { dayOfTimeline: day, phase, daysLeftInPhase };
}

@Controller('trial')
export class TrialController {
  @Post('start')
  async start(@Body() b: { tenantId: string; email: string; name?: string; plan?: Plan }){
    const plan: Plan = b?.plan || 'start';
    const phases: TrialPhases = { trialDays: 14, introDays: 14, introPrice: introPrice(plan), normalPrice: GROSS_PRICES[plan] };
    const startedAt = new Date();

    // TODO: persist to DB: tenantId, startedAt, plan
    // Schedule reminders relative to now (production: compute from persisted startedAt)
    const jobs = [];
    jobs.push(await mailQueue.add('trial_reminder', {
      to: b.email, template: 'trial_day10', vars: { name: b.name||'' }
    }, { delay: 10*DAY }));
    jobs.push(await mailQueue.add('trial_reminder', {
      to: b.email, template: 'trial_day14', vars: { name: b.name||'' }
    }, { delay: 14*DAY }));
    jobs.push(await mailQueue.add('trial_reminder', {
      to: b.email, template: 'trial_day27', vars: { name: b.name||'' }
    }, { delay: 27*DAY }));

    return { ok: true, phases, startedAt: startedAt.toISOString(), scheduled: jobs.map(j => j.id), plan };
  }

  @Get('status')
  async status(@Query('tenantId') tenantId?: string){
    // TODO: fetch trialStart from DB; demo assumes start -5 days
    const trialStart = new Date(Date.now() - 5*DAY);
    const { dayOfTimeline, phase, daysLeftInPhase } = calcPhase(trialStart);
    return { tenantId, dayOfTimeline, phase, daysLeftInPhase };
  }

  @Post('subscribe')
  async subscribe(@Body() b: { tenantId: string; plan: Plan; paymentMethodId?: string }){
    // TODO: integrate with Stripe/Provider: create trial+intro+regular plan
    return { ok: true, message: 'Subscription blueprint created – connect Stripe to activate.' };
  }
}
