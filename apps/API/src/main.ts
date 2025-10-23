import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Aktiviert CORS korrekt
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  });

  //  Sicherheit: erzwingt Header für ALLE Anfragen
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log( Finario API läuft auf Port ${port});
}

bootstrap();
