import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS: komplett offen (nur GET/HEAD/OPTIONS, keine Credentials)
  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Content-Type'],
    credentials: false,
    maxAge: 86400,
  });

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log( Server läuft auf Port ${port});
}
bootstrap();
