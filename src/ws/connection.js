import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Message, User } from '../../db/models';

const map = new Map();

const connectionCb = (socket, request) => {
  const { accessToken } = request.cookies;
  const { user: userFromJwt } = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
  );

  map.set(userFromJwt.id, { ws: socket, user: userFromJwt });

  map.forEach(({ ws }) =>
    ws.send(
      JSON.stringify({
        type: 'SET_USERS_FROM_SERVER',
        payload: [...map.values()].map(({ user }) => user),
      }),
    ),
  );

  socket.on('error', console.error);

  socket.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case 'ADD_MESSAGE_FROM_CLIENT':
        {
          const newMessage = await Message.create({
            text: payload,
            authorId: userFromJwt.id,
          });
          const messageWithUser = await Message.findByPk(
            newMessage.id,
            { include: User },
          );

          map.forEach(({ ws }) =>
            ws.send(
              JSON.stringify({
                type: 'ADD_MESSAGE_FROM_SERVER',
                payload: messageWithUser,
              }),
            ),
          );
        }
        break;

      case 'USER_TYPING_FROM_CLIENT':
        map.forEach(({ ws }) =>
          ws.send(
            JSON.stringify({
              type: 'USER_TYPING_FROM_SERVER',
              payload: userFromJwt,
            }),
          ),
        );
        break;

      case 'USER_STOP_TYPING_FROM_CLIENT':
        map.forEach(({ ws }) =>
          ws.send(
            JSON.stringify({
              type: 'USER_STOP_TYPING_FROM_SERVER',
            }),
          ),
        );
        break;

      default:
        break;
    }
  });

  socket.on('close', () => {
    map.delete(userFromJwt.id);
    map.forEach(({ ws }) =>
      ws.send(
        JSON.stringify({
          type: 'SET_USERS_FROM_SERVER',
          payload: [...map.values()].map(({ user }) => user),
        }),
      ),
    );
  });
};

export default connectionCb;
