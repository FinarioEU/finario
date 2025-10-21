import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { VersionController } from './version.controller.js';

@Module({
  imports: [],
  controllers: [AppController, VersionController],
  providers: [],
})
export class AppModule {}
