import jwt from 'jsonwebtoken';
import generateTokens from '../utils/generateTokens';

require('dotenv').config();

export default function verifyRefreshToken(req, res, next) {
  const { refreshToken } = req.cookies;

  try {
    const { user } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const { accessToken: access, refreshToken: refresh } =
      generateTokens({ user });
    res.cookie('accessToken', access).cookie('refreshToken', refresh);

    return next();
  } catch (error) {
    console.log('no refresh token');
    return res.redirect('/login');
  }
}
