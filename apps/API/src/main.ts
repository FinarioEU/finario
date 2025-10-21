import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Erstelle die NestJS-Anwendung
  const app = await NestFactory.create(AppModule);

  // Render gibt den Port über eine Umgebungsvariable weiter
  const port = process.env.PORT || 3000;

  // Server starten
  await app.listen(port, () => {
    console.log(`🚀 Server läuft auf Port ${port}`);
  });
}

bootstrap();
