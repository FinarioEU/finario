import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sicherheit
  app.use(helmet());

  // --- KORREKTE CORS-FREIGABE ---
  app.enableCors({
    origin: [
      'https://finario-web.onrender.com',
      'https://finario-web.onrender.com/',
    ],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: false,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log( Finario API läuft auf Port ${port});
}
bootstrap();
