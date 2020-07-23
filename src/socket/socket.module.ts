import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';

@Module({
  controllers: [],
  providers: [SocketController]
})
export class SocketModule {}
