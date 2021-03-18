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
      socialName: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      birthDate: Joi.date(),
      cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      status: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
      oldPassword: Joi.string(),
    },
  }),
  ensureAuthenticated,
  ProfileController.update,
);

export default profileRoutes;
