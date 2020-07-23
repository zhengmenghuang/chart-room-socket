/* console.log(this.server.clients().adapter.rooms[roomId].length)  单个房间总人数
 * console.log(this.server.clients().server.engine['clientsCount']) 所有房间总人数
 * */

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'socket' })
export class SocketController {
  @WebSocketServer() server: Server;
  chartRecord = new Map();

  // 生命周期 初始化
  afterInit() {
    this.server.on('connect', socket => {
      // 监听上线
      let info = { name: '', id: '', time: '' };

      // 监听错误
      socket.on('error', error => {
        console.log(error);
        socket.disconnect(true);
      });

      // 提取参数
      const roomId = socket.handshake.query['roomId'];

      // 加入房间
      socket.join(roomId);
      if (!this.chartRecord.has(roomId)) {
        this.chartRecord.set(roomId, []);
      }

      // 转发广播消息
      socket.on('msg', msg => {
        this.server.to(roomId).emit('msg', msg);
        this.chartRecord.get(roomId).push(msg);
        if (this.chartRecord.get(roomId).length > 200) {
          this.chartRecord.set(roomId, this.chartRecord.get(roomId).slice(-200))
        }
      });

      // 监听用户加入 先发历史记录 再发上线记录
      socket.on('join', m => {
        info = m;
        socket.emit('historyRecord', this.chartRecord.get(roomId));
        this.server.to(roomId).emit('msg', {
          type: 'join',
          value: {
            ...info,
            count: this.server.clients().adapter.rooms[roomId].length
          }
        });
      });

      // 广播某某掉线
      socket.on('disconnect', () => {
        this.server.to(roomId).emit('msg', {
          type: 'exit',
          value: {
            ...info,
            time: this.getNowTimeParse(),
            count: this.server.clients().adapter.rooms[roomId]?.length || 0
          }
        });
      });
    })
  }

  getNowTimeParse() {
    const time = new Date();
    const YYYY = time.getFullYear();
    const MM = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    const DD = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    const hh = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    const mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    const ss = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    const ms = time.getMilliseconds();

    return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.${ms}`;
}
}
