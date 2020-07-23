import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [SocketModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
