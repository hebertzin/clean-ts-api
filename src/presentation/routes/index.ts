import { Router } from 'express';
import { makeAddUserController } from '../../infra/factory/controller/make-add-user-controller';
import { adaptRoute } from '../../adapters/router-adapter';

const router = Router();

router.post('/user/register', adaptRoute(makeAddUserController()));

export default router;
