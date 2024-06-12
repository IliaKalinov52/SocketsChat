import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';
import 'dotenv/config';

const generateTokens = (payload) => ({
  accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: jwtConfig.access.expiresIn.toString(),
  }),
  refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: jwtConfig.refresh.expiresIn.toString(),
  }),
});

export default generateTokens;
