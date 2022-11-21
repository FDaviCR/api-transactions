import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

export const login = async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let password: string = req.body.password;

  Users.findOne({ where:{username:username} }).then((user:any) => {
    if(user != undefined){
        let correct = bcrypt.compareSync(password, user.password);
        
        if(correct){
          const token = jwt.sign({id: user.id, username: user.username}, process.env.SECRET_KEY, { expiresIn: '24h' });

          res.status(200);
          res.json({token:token});
        }else{
          res.json({message:'Senha errada!'});
        }

    }else{
      res.status(200);
      res.json({message:'Usuário não encontrado!'});
    }
  });
}
