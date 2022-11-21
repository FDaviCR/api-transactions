import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers['authorization'];

  if(authToken != undefined){
    jwt.verify(authToken, process.env.SECRET_KEY,(err:any, data:any) => {
      if(err){
        res.status(401);
        res.json({err:"Token inválido!"});
      }else{
        next();
      }
    });
  }else{
    res.status(401);
    res.json({err:"Token inválido!"});
  }
}
