import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');

const Users = require('../models/Users');
const Accounts = require('../models/Accounts');
const Transactions = require('../models/Transactions');

const { Op } = require("sequelize");

export const create = async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let value: number = req.body.value;

  try{
    const user = await Users.findOne({
      where: { id: res.locals.userId }
    });

    if(user.username !== username){
      const account = await Accounts.findOne({
        where: { id: user.AccountId }
      })

      if(account.balance >= value){
        const cashinUser = await Users.findOne({
          where: { username: username }
        });

        if(cashinUser != undefined){
          await Transactions.create({
            value:value,
            debitedAccountId: user.AccountId,
            creditedAccountId: cashinUser.AccountId,
            createdAt: Date.now()
          }).then(async () => {
            await Accounts.update({balance: parseFloat(account.balance) - value}, {
              where: {id: account.id}
            }).then(async ()=>{
              const accountCashIn = await Accounts.findOne({
                where: { id: cashinUser.AccountId }
              })
              await Accounts.update({balance: parseFloat(accountCashIn.balance) + value}, {
                where: {id: accountCashIn.id}
              })

              res.status(200);
              res.json({message: 'Transação concluida!'})
            }).catch((err:any)=>{
              console.log(err);
              res.status(400).send({message: 'Ocorreu um erro, a transação foi cancelada!'})
            })
          })
        }else{
          res.status(200).send({message:'O destinatario não existe!'});
        }
      }else{
        res.status(200).send({message:'O usuário não possui saldo suficiente para a transação!'});
      }
    }else{
      res.status(200).send({message:'Você não pode fazer uma transferencia para a propria conta!'});
    }
  }catch (error) {
    res.status(400);
    console.log(error);
  }
}

export const read = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({
      where: { id: res.locals.userId }
    });
    const transactions = await Transactions.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: user.AccountId },
          { creditedAccountId: user.AccountId }
        ]
      }
    });

    res.status(200);
    res.json({ transactions });
  }catch(error){
    res.status(400);
    console.log(error);
  }
}