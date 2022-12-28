const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { IMerchant } from '../interfaces/IMerchant';
import dotenv from 'dotenv';
import { MongoMerchantRepository } from '../repositories/mongo/MongoMerchantRepository';
import { MerchantService } from '../services/MerchantService';
import { Merchant } from '../entities/Merchant';

dotenv.config();

const mongoMerchantRepository = new MongoMerchantRepository();
const mongoMerchantService = new MerchantService(mongoMerchantRepository);

export async function signin(
  req: Request,
  res: Response
): Promise<Response<string, Record<string, IMerchant>>> {
  const { email, password } = req.body;

  const merchant = await mongoMerchantService.getMerchantByEmail(email);

  if (merchant === null || merchant === undefined) {
    return res.sendStatus(403);
  }

  const foundMerchant = new Merchant(
    merchant.id,
    merchant?.name,
    merchant?.email,
    merchant?.password,
    merchant?.facebook,
    merchant?.instagram
  );

  if (foundMerchant.checkPassword(password) === false) {
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

  const foundMerchant = new Merchant(
    crypto.randomUUID(),
    name,
    email,
    password,
    facebook,
    instagram
  );

  const merchantData: IMerchant = {
    id: foundMerchant.getId(),
    name: foundMerchant.getName(),
    email: foundMerchant.getEmail(),
    password: foundMerchant.getPassword(),
    facebook: foundMerchant.getFacebook(),
    instagram: foundMerchant.getInstagram(),
  };

  mongoMerchantService.saveMerchant(merchantData);

  return res.sendStatus(201);
}

export async function getUser(
  req: any,
  res: Response
): Promise<Response<any, Record<string, IMerchant>>> {
  const merchant = await mongoMerchantService.getMerchantById(req.user.id);

  return res.json(merchant);
}
