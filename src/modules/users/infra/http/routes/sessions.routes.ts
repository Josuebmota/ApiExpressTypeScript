import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string()
        .email()
        .required()
        .error(new Error('Email é obrigatório')),
      password: Joi.string().required().error(new Error('Senha é obrigatório')),
    },
  }),
  SessionController.create,
);

export default sessionsRouter;
