import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const Users = require('../models/Users');
const Accounts = require('../models/Accounts');
const Check = require('../functions/check');

export const list = async (req: Request, res: Response) => {
  let users = await Users.findAll();

  res.status(200);
  res.json({ users: users});
}

export const create = async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let password: string = req.body.password;
  const isValid:boolean = await Check.checkPassword(password);
  
  try {
    if(username.length >= 3 && password.length >= 8 && isValid){
      const user = await Users.findOne({
        where: { username: username }
      });
      
      if(user == null) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        await Users.create({ username: username, password: hash }).then(async (user:any) => {
          await Accounts.create({balance: 100.00}).then(async (account:any) => {
            await Users.update({ AccountId: account.id }, {
              where: {id: user.id}
            })
          }).catch((err:any)=>{
            console.log(err);
          })
        }).catch((err:any)=>{
          console.log(err);
        })

        res.status(200);
        res.json('Usuário criado com sucesso!');
      }else{
        res.status(400);
        res.json('Este nome de usuário já existe, utilize outro.')
      }
    }else{
      res.status(200);
      res.json('O nome de usuário deve ter, pelo menos, 3 caracteres e a senha 8.')
    }
  } catch (error) {
    res.status(400);
    console.log(error);
  }
}
