import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js'; // <— .js wichtig!

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
