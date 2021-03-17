import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

usersRouter.post('/', UsersController.create);
usersRouter.put('/', ensureAuthenticated, UsersController.update);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
