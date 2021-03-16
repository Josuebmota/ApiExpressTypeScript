import {Router} from 'express';

import SessionController from '../app/controllers/SessionController'

const sessionsRouter = Router();

sessionsRouter.post('/login',SessionController.login)

export default sessionsRouter;
