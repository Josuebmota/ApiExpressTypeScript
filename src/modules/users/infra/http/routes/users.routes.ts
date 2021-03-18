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
      socialName: Joi.string(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      birthDate: Joi.date().required(),
      cpf: Joi.string()
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .required(),
      status: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  UsersController.create,
);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatarFilename'),
  UserAvatarController.update,
);

export default usersRouter;
