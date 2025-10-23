import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS-Header hart setzen (für alle Routen, auch ohne Preflight)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  // (optional) Nest-CORS zusätzlich – schadet nicht
  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Content-Type', 'Origin'],
    credentials: false,
    maxAge: 86400,
  });

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log( Server läuft auf Port ${port});
}
bootstrap();
