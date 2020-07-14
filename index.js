const app = require('express')();

// const https = require('https');
// const fs = require('fs');
// const httpsOption = {
// 	key: fs.readFileSync('./https/3492840_www.llxhzm.xyz.key'),
// 	cert: fs.readFileSync('./https/3492840_www.llxhzm.xyz.pem')
// };
// const port = 6001;
//
// const server = https.Server(httpsOption, app);

const http = require('http');
const port = 6001;
const server = http.Server(app);

const io = require('socket.io')(server);

const utils = require('./utils/util')

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  // 监听上线
  let info = {
    name: '',
	id: '',
	time: ''
  };

  // 监听错误
  socket.on('error', error => {
    console.log(error);
    socket.destroy();
  });

  // 提取参数
  const roomId = socket.handshake.query['roomId'];

  // 加入房间
  socket.join(roomId);


  // 转发广播消息
  socket.on('msg', msg => {
    io.to(roomId).emit('msg', msg);
  });

  // 监听用户加入
  socket.on('join', m => {
    console.log(m)
    info = m;
    io.to(roomId).emit('msg', {
      type: 'join',
      value: {
        ...info,
        count: io.sockets.adapter.rooms[roomId].length
      }
    });
  });

  // 广播某某掉线
  socket.on('disconnect', () => {
    io.to(roomId).emit('msg', {
      type: 'exit',
      value: {
        ...info,
        time: utils.getNowTimeParse(),
        count: io.sockets.adapter.rooms[roomId] ? io.sockets.adapter.rooms[roomId].length : 0
      }
    });
  });
})

server.listen(port, function () {
  console.log('listening on *:' + port);
});

