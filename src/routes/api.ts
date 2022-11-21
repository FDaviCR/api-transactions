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
router.post('/accounts', AccountController.create);
router.put('/accounts/:code', AccountController.update);
router.delete('/accounts/:code', AccountController.destroy);
router.get('/accounts/:code', AccountController.read);
router.get('/accounts', AccountController.list);

// Endpoints de Transações
router.post('/transactions', TransactionController.create);
router.put('/transactions/:code', TransactionController.update);
router.get('/transactions/:code', TransactionController.read);

export default router;