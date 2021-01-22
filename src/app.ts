import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

import createConnection from './database';

process.env.NODE_ENV !== 'test' && createConnection();
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err
    // message: 'Internal server error',
  });
});

export default app;
