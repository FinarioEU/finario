import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TrialController } from './trial.controller';
import { StripeWebhookController } from './stripe.controller';

@Module({
  controllers: [HealthController, TrialController, StripeWebhookController],
  providers: [],
})
export class AppModule {}
