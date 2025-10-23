import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  CORS global erzwingen (auch für Preflight)
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'HEAD', 'OPTIONS'],
      allowedHeaders: ['Origin', 'Accept', 'Content-Type'],
      optionsSuccessStatus: 204,
    }),
  );

  //  Sicherheitsnetz – Header manuell setzen (doppelt hält besser)
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log( Finario API läuft auf Port ${port});
}

bootstrap();
