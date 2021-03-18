import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRoutes = Router();

profileRoutes.get('/', ensureAuthenticated, ProfileController.show);
profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string()
        .email()
        .required()
        .error(new Error('Email é Obrigatório')),
      cpf: Joi.string()
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .error(new Error('Cpf inválido, xxx.xxx.xxx-xx')),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      old_password: Joi.string(),
    },
  }),
  ensureAuthenticated,
  ProfileController.update,
);

export default profileRoutes;
