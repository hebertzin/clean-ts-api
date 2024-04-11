import express from 'express';

const router = express.Router();

import { createUser } from '../controller/user';
import { loginController } from '../controller/auth/index';

/**
 * @openapi
 * tags:
 *   - name: "Usuário"
 *     description: "Operações relacionadas a usuários"
 * /user/register:
 *   post:
 *     description: Cria um usuário no sistema
 *     tags:
 *       - Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/user/register', createUser);

/**
 * @openapi
 * tags:
 *   - name: "Autenticação"
 *     description: "Operações relacionadas a autenticação ou autorização"
 * /auth/login:
 *   post:
 *     description: Logar um usuário no sistema
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User login and generated the token
 *       401:
 *         description: Credential are invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/auth/login', loginController);

export default router;
