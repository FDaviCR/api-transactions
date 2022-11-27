import { Request, Response } from 'express';

const Users = require('../models/Users');
const Accounts = require('../models/Accounts');

export const getBalance = async (req: Request, res: Response) => {
  try{
    const user = await Users.findOne({
      where: { id: res.locals.userId }
    });

    const account = await Accounts.findOne({
      where: { id: user.AccountId }
    });

    res.status(200);
    res.json({ balance: account.balance});
  }catch (error) {
    res.status(400);
    console.log(error);
  }
}
