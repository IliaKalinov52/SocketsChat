import jwt from 'jsonwebtoken';
import verifyRefreshToken from './verifyRefreshToken';
import 'dotenv/config';

export default function verifyAccessToken(req, res, next) {
  const { accessToken } = req.cookies;
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch (error) {
    return verifyRefreshToken(req, res, next);
  }
}
