import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS für Frontend erlauben (bei Bedarf Domains einschränken)
  app.enableCors();

  // Health-Route (für Render)
  app.getHttpAdapter().get('/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Finario API is running 🚀' });
  });

  // Optional: Root-Route (damit "/" nicht 404 ist)
  app.getHttpAdapter().get('/', (_req, res) => {
    res.type('text/plain').send('Finario API ✅');
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`✅ Server läuft auf Port: ${port}`);
}
bootstrap();
