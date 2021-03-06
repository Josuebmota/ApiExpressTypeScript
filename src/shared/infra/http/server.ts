import 'reflect-metadata';
import 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
// import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

// app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/onicadastroapi/v1/file', express.static(uploadConfig.uploadsFolder));
app.use('/onicadastroapi/v1/', routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      meessage: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
    err,
  });
});

app.listen(3333, () => {
  console.log('🚀 OnilearningApi started on port 3333!!!');
});
