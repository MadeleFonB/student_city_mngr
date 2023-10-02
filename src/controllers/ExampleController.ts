import { Request, Response, Router } from 'express';
import { Logger } from 'tslog';
import RequestLogger from '../utilities/RequestLogger';
import OpenApiValidatorProvider from '../utilities/OpenApiValidatorProvider';

const logger = new Logger({ name: 'ob:ExampleController' });
const validator = OpenApiValidatorProvider.getValidatorForExample();

const ExampleController = Router();

ExampleController.get(
  '/greeting',
  RequestLogger.basic,
  validator.validate('get', '/greeting'),
  async (req: Request, res: Response) => {
    const rqUuid: string = req.headers['x-rquid'] as string;
    const name: string = req.query.name as string;
    logger.info(`[${rqUuid}] Greeting ${name}`);
    res.send({ greeting: `Hola ${name}` });
    res.end();
  },
);

export default ExampleController;
