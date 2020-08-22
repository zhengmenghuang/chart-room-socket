import { IoAdapter } from '@nestjs/platform-socket.io';
export declare class RedisIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: any): any;
}
