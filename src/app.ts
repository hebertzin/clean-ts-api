import express from 'express';
import { authMiddleware } from './middlewares/auth-middlware';
const app = express();

import routes from './routes';

import db from './database';

import { config } from 'dotenv';

config();
import cors from 'cors';
import { env } from './env';
import { logger } from './logger';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(routes);

db.on('conected', () => {
  logger.info('successfully connected');
});

db.on('error', (error) => {
  logger.error(`error connecting ${error}`);
});

app.listen(env.PORT, () => {
  logger.log({
    level: 'info',
    message: 'Server is running seucessfully',
  });
});
