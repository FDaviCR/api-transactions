import { Request, Response } from 'express';

const Transactions = require('../models/Transactions');

export const list = async (req: Request, res: Response) => {
  let transactions = await Transactions.findAll();

  res.status(200);
  res.json({ transactions });
}

export const create = async (req: Request, res: Response) => {
  
}

export const update = async (req: Request, res: Response) => {
  
}

export const read = async (req: Request, res: Response) => {}
export const destroy = async (req: Request, res: Response) => {}