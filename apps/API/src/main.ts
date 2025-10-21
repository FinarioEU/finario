import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Header
  app.use(helmet());

  // CORS: trage hier später deine Frontend-URL ein
  app.enableCors({
    origin: ['https://DEIN-FRONTEND.example'], // vorerst offen lassen: ['*']
    credentials: false,
  });

  // Global Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Finario API')
    .setDescription('Finario API Dokumentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(✅ Server läuft auf Port: ${port});
}
bootstrap();
