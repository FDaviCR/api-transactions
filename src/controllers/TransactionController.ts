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
    });
  }catch (error) {
    res.status(400);
    console.log(error);
  }

}

export const update = async (req: Request, res: Response) => {
  
}

export const read = async (req: Request, res: Response) => {}