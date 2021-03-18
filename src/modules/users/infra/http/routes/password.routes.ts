import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const sessionsRouter = Router();

sessionsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  ForgotPasswordController.create,
);
sessionsRouter.post(
  '/resset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string()
        .uuid()
        .required()
        .error(new Error('Token é obrigatório')),
      password: Joi.string().required().error(new Error('Senha é obrigatório')),
      password_confirmation: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .error(new Error('Confirmação de senha é obrigatório')),
    },
  }),
  ResetPasswordController.create,
);

export default sessionsRouter;
