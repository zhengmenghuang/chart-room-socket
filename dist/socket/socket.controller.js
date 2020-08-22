"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketController = void 0;
const websockets_1 = require("@nestjs/websockets");
const swagger_1 = require("@nestjs/swagger");
let SocketController = class SocketController {
    constructor() {
        this.chartRecord = new Map();
    }
    afterInit() {
        this.server.on('connect', socket => {
            let info = { name: '', id: '', time: '' };
            socket.on('error', error => {
                console.log(error);
                socket.disconnect(true);
            });
            const roomId = socket.handshake.query['roomId'];
            socket.join(roomId);
            if (!this.chartRecord.has(roomId)) {
                this.chartRecord.set(roomId, []);
            }
            socket.on('msg', msg => {
                this.server.to(roomId).emit('msg', msg);
                this.chartRecord.get(roomId).push(msg);
                if (this.chartRecord.get(roomId).length > 200) {
                    this.chartRecord.set(roomId, this.chartRecord.get(roomId).slice(-200));
                }
            });
            socket.on('join', m => {
                info = m;
                socket.emit('historyRecord', this.chartRecord.get(roomId));
                this.server.to(roomId).emit('msg', {
                    type: 'join',
                    value: Object.assign(Object.assign({}, info), { count: this.server.clients().adapter.rooms[roomId].length })
                });
            });
            socket.on('disconnect', () => {
                var _a;
                this.server.to(roomId).emit('msg', {
                    type: 'exit',
                    value: Object.assign(Object.assign({}, info), { time: this.getNowTimeParse(), count: ((_a = this.server.clients().adapter.rooms[roomId]) === null || _a === void 0 ? void 0 : _a.length) || 0 })
                });
            });
        });
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
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], SocketController.prototype, "server", void 0);
SocketController = __decorate([
    swagger_1.ApiTags('socket'),
    websockets_1.WebSocketGateway({ namespace: 'socket' })
], SocketController);
exports.SocketController = SocketController;
//# sourceMappingURL=socket.controller.js.map