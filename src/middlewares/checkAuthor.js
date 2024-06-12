import { Movie } from '../../db/models';

export default async function checkAuthor(req, res, next) {
  const { movieId } = req.params;
  const targetMovie = await Movie.findByPk(movieId);
  if (targetMovie.userId === res.locals.user.id) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden' });
}
