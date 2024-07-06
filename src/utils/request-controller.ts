import { Request, Response, NextFunction } from 'express';

export interface HandleRequestController {
  handle(req: Request, res: Response, next?: NextFunction): Promise<Response>;
}
