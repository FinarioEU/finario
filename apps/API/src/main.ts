import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS zulassen (Frontend darf zugreifen)
  app.enableCors({
    origin: '*', // später enger setzen (z.B. deine Domain)
  });

  // Optional: Alle Routen unter /api
  // app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
