import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const sessionsRouter = Router();

sessionsRouter.post('/forgot', ForgotPasswordController.create);
sessionsRouter.post('/resset', ResetPasswordController.create);

export default sessionsRouter;
