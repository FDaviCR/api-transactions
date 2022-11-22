import { Router } from 'express';

import * as LoginController from '../controllers/LoginController';
import * as UserController from '../controllers/UserController';
import * as AccountController from '../controllers/AccountController';
import * as TransactionController from '../controllers/TransactionController';

import { authorization } from '../functions/auth';

const router = Router();

// Endpoint de Login
router.post('/login', LoginController.login);

// Endpoints de Usuários
router.post('/users', UserController.create);
router.get('/users', authorization, UserController.list);

// Endpoints de Saldo
router.get('/accounts', AccountController.read);

// Endpoints de Transações
router.post('/transactions', TransactionController.create);
router.get('/transactions/:code', TransactionController.read);

export default router;