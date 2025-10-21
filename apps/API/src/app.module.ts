import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { VersionController } from './version.controller';

@Module({
  imports: [
    // .env für spätere DB/Keys usw.
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate Limiting: 60 Requests pro Minute
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000, // 60 Sekunden
        limit: 60,
      },
    ]),
  ],
  controllers: [AppController, VersionController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
