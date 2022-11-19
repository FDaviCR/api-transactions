import { Request, Response } from 'express';

const Accounts = require('../models/Accounts');

export const list = async (req: Request, res: Response) => {
  let accounts = await Accounts.findAll();

  res.status(200);
  res.json({ accounts });
}

export const create = async (req: Request, res: Response) => {
  
}

export const update = async (req: Request, res: Response) => {
  
}

export const read = async (req: Request, res: Response) => {}
export const destroy = async (req: Request, res: Response) => {}