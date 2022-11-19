import { Request, Response } from 'express';

const Users = require('../models/Users');

export const list = async (req: Request, res: Response) => {
  let users = await Users.findAll();

  res.status(200);
  res.json({ users: users});
}

export const create = async (req: Request, res: Response) => {
  
}

export const update = async (req: Request, res: Response) => {
  
}

export const read = async (req: Request, res: Response) => {}
export const destroy = async (req: Request, res: Response) => {}