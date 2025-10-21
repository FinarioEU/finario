import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { VersionController } from './version.controller';

@Module({
  imports: [
    // .env später für DB/Keys usw.
    ConfigModule.forRoot({ isGlobal: true }),
    // Rate Limiting: max 60 Requests / 60s pro IP
    ThrottlerModule.forRoot([{ ttl: 60, limit: 60 }]),
  ],
  controllers: [AppController, VersionController],
  providers: [],
})
export class AppModule {}
