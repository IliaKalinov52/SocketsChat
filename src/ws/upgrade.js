import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { WebSocketServer } from 'ws';

export const wss = new WebSocketServer({
  clientTracking: false,
  noServer: true,
});

export const upgradeCb = (request, socket, head) => {
  socket.on('error', console.error);

  cookieParser()(request, {}, () => {
    const { accessToken } = request.cookies;

    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      socket.removeListener('error', console.error);

      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } catch (error) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
    }
  });
};
