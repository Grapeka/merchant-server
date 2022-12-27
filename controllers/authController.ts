const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import merchants, { IMerchant } from '../db/users';
import dotenv from 'dotenv';
dotenv.config();

export async function signin(
  req: Request,
  res: Response
): Promise<Response<string, Record<string, IMerchant>>> {
  const { email, password } = req.body;

  const merchant = await merchants.find(
    (user) => user.email === email && user.password === password
  );

  if (merchant === undefined) {
    return res.sendStatus(403);
  }

  const { id } = merchant as IMerchant;

  const accessToken = jwt.sign(
    { id, email, password },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '2h' }
  );

  return res.json({ accessToken, merchant });
}

export async function signup(
  req: Request,
  res: Response
): Promise<Response<any>> {
  const { name, email, password, facebook, instagram } = req.body;

  const merchant = {
    id: merchants.length + 1,
    name,
    email,
    password,
    facebook,
    instagram,
  };

  merchants.push(merchant);

  return res.sendStatus(201);
}

export async function getUser(
  req: any,
  res: Response
): Promise<Response<any, Record<string, IMerchant>>> {
  const { email, password } = req.body;

  const merchant = merchants.find(
    (user) => user.email === email && user.password === password
  );

  return res.json(merchant);
}
