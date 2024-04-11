import express from 'express';
import { authMiddleware } from './middlewares/auth-middlware';
import routes from './routes';
import db from './database';
import cors from 'cors';
import { env } from './env';
import { logger } from './logger';
import { zodErrorMiddleware } from './middlewares/zod-error-middleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(zodErrorMiddleware);
app.use(routes);

db.on('conected', () => {
  logger.info('Successfully connected');
});

db.on('error', (error) => {
  logger.error(`Erro connecting ${error}`);
});

app.listen(env.PORT, () => {
  logger.log({
    level: 'info',
    message: 'Server is running seucessfully',
  });
});
