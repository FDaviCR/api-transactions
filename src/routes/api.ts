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
router.put('/users/:code', UserController.update);
router.delete('/users/:code', UserController.destroy);
router.get('/users/:code', UserController.read);
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
router.delete('/transactions/:code', TransactionController.destroy);
router.get('/transactions/:code', TransactionController.read);
router.get('/transactions', TransactionController.list);

export default router;