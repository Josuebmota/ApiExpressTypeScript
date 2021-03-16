import {Router} from 'express';
import multer from 'multer'
import uploadConfig from '../config/upload'

import UserController from '../app/controllers/UserController'
import UserAvatarController from '../app/controllers/UserAvatarController'

import ensureAuthenticated from '../app/middlewares/ensureAuthenticated'

const usersRouter = Router();
const upload = multer(uploadConfig)

usersRouter.post('/', UserController.store)
usersRouter.put('/', ensureAuthenticated, UserController.update)
usersRouter.patch('/avatar', ensureAuthenticated, UserAvatarController.update)

export default usersRouter;
