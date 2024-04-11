import express from 'express';
import { authMiddleware } from './middlewares/auht-middlware';
const app = express();

import routes from './routes';

import db from './database';

import { config } from 'dotenv';

config();
import cors from 'cors';
import { env } from './env';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(routes);

db.on('conected', () => {
  console.log('successfully connected');
});

db.on('error', (error) => {
  console.log(`error connecting ${error}`);
});

app.listen(env.PORT, () => {
  console.log('Server is running');
});
