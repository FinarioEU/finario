import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Header
  app.use(helmet());

  // --- CORS freigeben für die Web-Site auf Render ---
  const allowed = new Set([
    'https://finario-web.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000',
  ]);

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);               // direkte Aufrufe (z.B. Browser/health)
      if (allowed.has(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: false,
    maxAge: 86400,
  });

  // API-Präfix nur für echte API-Routen
  app.setGlobalPrefix('api', { exclude: ['health'] });

  // Globale Validierung
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`Finario API läuft auf Port ${port}`);
}

bootstrap();
