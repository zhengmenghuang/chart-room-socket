import { Server } from 'socket.io';
export declare class SocketController {
    server: Server;
    chartRecord: Map<any, any>;
    afterInit(): void;
    getNowTimeParse(): string;
}
