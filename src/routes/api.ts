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

// Endpoint de Saldo
router.get('/accounts', authorization, AccountController.getBalance);

// Endpoints de Transações
router.post('/transactions', authorization, TransactionController.create);
router.get('/transactions', authorization, TransactionController.read);

export default router;