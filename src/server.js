import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import jsxRender from './utils/jsxRender';
import renderRouter from './routes/renderRouter';
import apiAuthRouter from './routes/apiAuthRouter';
import resLocals from './middlewares/resLocals';
import 'dotenv/config';
import { wss, upgradeCb } from './ws/upgrade';
import connectionCb from './ws/connection';

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components/pages'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(resLocals);

app.use('/', renderRouter);
app.use('/api/auth', apiAuthRouter);

const server = createServer(app);

server.on('upgrade', upgradeCb);
wss.on('connection', connectionCb);

server.listen(PORT, () =>
  console.log(`App has started on port ${PORT}`),
);
