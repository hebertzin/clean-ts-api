import express, { Express, Request, Response } from 'express';
import db from './database';
import cors from 'cors';
import { logger } from './logger';

import authRouter from './routes';
import { HttpStatusCode } from './utils/http-status-code';

db.on('connected', () => {});

db.on('error', () => {});

export class ExpressApp {
  private expressApp: Express;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.expressApp.use(
      cors({
        origin: process.env.ORIGIN_URL,
      }),
    );
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true, limit: '50mb' }));
  }

  private routes() {
    this.expressApp.use('/api/v1', authRouter);

    this.expressApp.get('/health', (req: Request, res: Response) => {
      return res.status(HttpStatusCode.Ok).json({
        status: 'up',
        message: 'Aplication is alive!',
        path: req.path,
        timestamp: new Date().toISOString(),
      });
    });
  }

  public start(port: number) {
    return this.expressApp.listen(port, () => {
      logger.info(`Sever is running on por ${port}!`);
    });
  }

  public getApp(): Express {
    return this.expressApp;
  }
}
