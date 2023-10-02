import { NextFunction, Request, Response } from 'express';
import { Logger } from 'tslog';

const logger = new Logger({ name: 'ob:RequestLogger' });

export default class RequestLogger {
  public static basic = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const rqUuid = req.headers['x-rquid'];
    logger.info(
      `[${rqUuid}] Path: ${req.path}`,
      `Query:`,
      req.query,
      `Headers:`,
      req.headers,
    );
    logger.debug(`[${rqUuid}] Body:`, req.body);
    next();
  };
}
