import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { VersionController } from './version.controller';

@Module({
  imports: [
    // .env später für DB/Keys usw. nutzbar
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate Limiting: max 60 Requests / 60s pro IP
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
  ],
  controllers: [AppController, VersionController],
  providers: [
    // Globaler Guard -> kein manueller Aufruf in main.ts nötig
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
