import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');

const Users = require('../models/Users');
const Accounts = require('../models/Accounts');
const Transactions = require('../models/Transactions');

export const create = async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let value: number = req.body.value;
  const authToken = req.headers['authorization'];

  try{
    jwt.verify(authToken, process.env.SECRET_KEY, async(err:any, data:any) => {
      if(data.username !== username){
        const user = await Users.findOne({
          where: { username: data.username }
        });

        const account = await Accounts.findOne({
          where: { id: user.AccountId }
        })

        if(account.balance >= value){

        }else{
          res.status(200).send({message:'O usuário não possui saldo suficiente para a transação!'});
        }
      }else{
        res.status(200).send({message:'Você não pode fazer uma transferencia para a propria conta!'});
      }
    });
  }catch (error) {
    res.status(400);
    console.log(error);
  }

}

export const update = async (req: Request, res: Response) => {
  
}

export const read = async (req: Request, res: Response) => {}