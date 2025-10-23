import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Korrekte CORS-Konfiguration für Render
  app.enableCors({
    origin: '*', // erlaubt alle Domains (später kannst du das einschränken)
    methods: 'GET,HEAD,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Origin',
  });

  //  Zusätzlich sicherstellen, dass alle Preflight-Optionen beantwortet werden
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log( Finario API läuft auf Port ${port});
}

bootstrap();
