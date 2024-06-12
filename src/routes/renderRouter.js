import express from 'express';
import { User, Message } from '../../db/models';
import verifyAccessToken from '../middlewares/verifyAccessToken';
import checkNotAuth from '../middlewares/checkNotAuth';

const router = express.Router();

router.get('/', async (req, res) => {
  const initState = {};
  res.render('MainPage', initState);
});

router.get('/login', checkNotAuth, (req, res) =>
  res.render('LoginPage'),
);

router.get('/signup', checkNotAuth, (req, res) =>
  res.render('SignUpPage'),
);

router.get('/chat', verifyAccessToken, async (req, res) => {
  const initState = {};
  const messages = await Message.findAll({ include: User });
  initState.messages = messages;
  res.render('ChatPage', initState);
});

export default router;
