import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

const redisAdapter = redisIoAdapter({ host: '119.29.159.51', port: 6379 });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
