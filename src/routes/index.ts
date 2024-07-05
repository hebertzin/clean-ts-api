import { Router } from 'express';

const authRouter = Router();

import { createUser } from '../controller/user';
import { loginController } from '../controller/auth/index';

authRouter.post('/authentication/user/register', createUser);

authRouter.post('/authentication/user/sign-in', loginController);

export default authRouter;
