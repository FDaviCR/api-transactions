import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');

const Users = require('../models/Users');
const Accounts = require('../models/Accounts');

export const read = async (req: Request, res: Response) => {
  const authToken = req.headers['authorization'];
  jwt.verify(authToken, process.env.SECRET_KEY, async(err:any, data:any) => {
    const user = await Users.findOne({
      where: { username: data.username }
    });

    const account = await Accounts.findOne({
      where: { id: user.AccountId }
    });

    res.status(200);
    res.json({ balance: account.balance});
  })
}