import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', socket => {
  console.log(socket);
});

//TODO ws 와 socket.io 비교를 위한 기존 ws 코드 (추후 삭제)

// const wss = new WebSocket.Server({ server });

// const sockets = [];

// const handleConnection = socket => {
//   sockets.push(socket);
//   sockets['nickname'] = 'Anon';
//   console.log('Connected  to Browser ✅');
//   socket.on('close', () => console.log('Disconnected from the Browser ❌'));
//   socket.on('message', msg => {
//     const message = JSON.parse(msg);
//     // console.log(message);
//     switch (message.type) {
//       case 'new_message':
//         sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
//         break;
//       case 'nickname':
//         socket['nickname'] = message.payload;
//         break;
//     }
//   });
// };
//
// wss.on('connection', handleConnection);

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
