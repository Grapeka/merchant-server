const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import merchants, { IMerchant } from '../mocks/users';
import dotenv from 'dotenv';
import { MongoMerchantRepository } from '../repositories/mongo/MongoMerchantRepository';
import { MerchantService } from '../services/MerchantService';

dotenv.config();

const mongoMerchantRepository = new MongoMerchantRepository();
const mongoMerchantService = new MerchantService(mongoMerchantRepository);

export async function signin(
  req: Request,
  res: Response
): Promise<Response<string, Record<string, IMerchant>>> {
  const { email, password } = req.body;

  const merchant = await mongoMerchantService.getMerchantByEmail(email);

  if (
    merchant?.password !== password ||
    merchant === null ||
    merchant === undefined
  ) {
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
  mongoMerchantService.saveMerchant(merchant);

  return res.sendStatus(201);
}

export async function getUser(
  req: any,
  res: Response
): Promise<Response<any, Record<string, IMerchant>>> {
  const merchant = await mongoMerchantService.getMerchantById(req.user.id);

  return res.json(merchant);
}
