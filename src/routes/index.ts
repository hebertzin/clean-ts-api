import express from 'express';

const router = express.Router();

import { CreateUser } from '../controller/user';
import { LoginController } from '../controller/login/index';

router.post('/user', CreateUser);
router.post('/login', LoginController);

export default router;
