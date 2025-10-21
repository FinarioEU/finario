import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security-Header
  app.use(helmet());

  // CORS (Frontend-URL später hier präzisieren)
  app.enableCors({
    origin: '*', // TODO: später auf deine Web-App-Domain einschränken
    credentials: false,
  });

  // Globales Rate-Limit
  app.useGlobalGuards(new ThrottlerGuard());

  // Optional: request body validation (für DTOs in Zukunft)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(✅ Server läuft auf Port: ${port});
}

bootstrap();
