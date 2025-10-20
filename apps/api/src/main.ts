import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/\.vercel\.app$/, 'http://localhost:3000', 'https://finario.eu'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15*60*1000, max: 300 }));
  // Raw body nur für Stripe-Webhook
  app.use('/stripe/webhook', bodyParser.raw({ type: '*/*' }));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
