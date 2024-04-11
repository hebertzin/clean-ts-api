import express from 'express';
import { authMiddleware } from './middlewares/auth-middlware';
import routes from './routes';
import db from './database';
import cors from 'cors';
import { env } from './env';
import { logger } from './logger';
import { zodErrorMiddleware } from './middlewares/zod-error-middleware';
import { logResponseTime } from './middlewares/log-response-middleware';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import bodyParser from 'body-parser';

const app = express();

app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(logResponseTime);
app.use(zodErrorMiddleware);

db.on('connected', () => {
  logger.info('Connected in database');
});

db.on('error', (error) => {
  logger.error('Some error ocured try connect in database', error);
});

app.listen(env.PORT, () => {
  logger.log({
    level: 'info',
    message: 'Server is running seucessfully',
  });
});
