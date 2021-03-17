import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post('/login', SessionController.create);

export default sessionsRouter;
