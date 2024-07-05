import { Router } from 'express';

const authRouter = Router();

import { createUser } from '../controllers/user';
import { loginController } from '../controllers/authentication/index';

authRouter.post('/authentication/user/register', createUser);

authRouter.post('/authentication/user/sign-in', loginController);

export default authRouter;
