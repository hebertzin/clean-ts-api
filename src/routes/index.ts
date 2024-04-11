import express from 'express';

const router = express.Router();

import { createUser } from '../controller/user/user';
import { loginController } from '../controller/auth/index';

router.post('/user/register', createUser);
router.post('/user/login', loginController);

export default router;
