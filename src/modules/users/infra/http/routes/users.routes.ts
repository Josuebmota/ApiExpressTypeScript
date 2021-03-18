import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      firstName: Joi.string()
        .required()
        .error(new Error('Primeiro nome é obrigatório')),
      lastName: Joi.string()
        .required()
        .error(new Error('Último nome é Obrigatório')),
      birthDate: Joi.date()
        .required()
        .error(new Error('Data de nascimento é obrigatório')),
      cpf: Joi.string()
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .error(new Error('Cpf inválido, xxx.xxx.xxx-xx'))
        .required()
        .error(new Error('Cpf é obrigatório')),
      email: Joi.string()
        .email()
        .required()
        .error(new Error('Email é Obrigatório')),
      password: Joi.string().required().error(new Error('Senha é obrigatório')),
      passwordConfirmation: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .error(new Error('Confirmação de password é obrigatório')),
    },
  }),
  UsersController.create,
);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
