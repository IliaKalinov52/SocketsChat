import jwtConfig from '../config/jwtConfig';

export default function checkNotAuth(req, res, next) {
  const refresh = req.cookies[jwtConfig.refresh.name];
  if (!refresh) {
    return next();
  }
  res.redirect('/');
}
