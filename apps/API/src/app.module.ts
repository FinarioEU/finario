import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VersionController } from './version.controller';

@Module({
  controllers: [AppController, VersionController],
  providers: [],
})
export class AppModule {}
