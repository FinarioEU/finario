import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Header – ohne strikte CSP/COREP (wir liefern nur JSON)
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // * CORS sehr großzügig, damit Static-Site auf onrender.com zugreifen darf *
  app.enableCors({
    origin: [
      /\.onrender\.com$/,                     // alle *.onrender.com (Render)
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:8080',
    ],
    methods: ['GET', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Content-Type'],
    credentials: false,                       // wir brauchen keine Cookies/Secrets
    maxAge: 86400,
  });

  // Globale Validation (Future-Proofing)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log( Server läuft auf Port: ${port});
}
bootstrap();
