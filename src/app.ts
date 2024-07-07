import express from 'express';
import db from './database';
import cors from 'cors';
import { env } from './env';
import { logger } from './logger';

import { logResponseTime } from './middlewares/log-response-middleware';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import bodyParser from 'body-parser';
import authRouter from './routes';

const app = express();

db.on('connected', () => {
  logger.info('Connected in database');
});

db.on('error', (error) => {
  logger.error('Some error ocurred try connect in database', error);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logResponseTime);

app.use('/api/v1', authRouter);

app.listen(env.PORT, () => {
  logger.log({
    level: 'info',
    message: 'Server is running seucessfully',
  });
});
