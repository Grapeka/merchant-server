import { Request, Response } from 'express';
import { IMerchant } from '../interfaces/IMerchant';
import { MongoMerchantRepository } from '../repositories/mongo/MongoMerchantRepository';
import { MerchantService } from '../services/MerchantService';
import { Merchant } from '../entities/Merchant';
import { MerchantModel } from '../models/MerchantModel';
import crypto from 'crypto';
import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');

dotenv.config();

const merchantModel = MerchantModel.getInstance();
const mongoMerchantRepository = new MongoMerchantRepository(merchantModel);
const mongoMerchantService = new MerchantService(mongoMerchantRepository);

export class AuthController {
  async signin(
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

  async signup(req: Request, res: Response): Promise<Response<any>> {
    const { name, email, password, facebook, instagram } = req.body;

    const foundMerchant = new Merchant(
      crypto.randomUUID(),
      name,
      email,
      password,
      facebook,
      instagram
    );

    const errors = foundMerchant.validate();
    if (errors) {
      return res.status(400).json(errors);
    }

    const hashedPassword = await foundMerchant.hashPassword(password);
    foundMerchant.setPassword(hashedPassword);

    const merchantData = {
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

  async getUser(
    req: any,
    res: Response
  ): Promise<Response<any, Record<string, IMerchant>>> {
    const merchant = await mongoMerchantService.getMerchantById(req.user.id);

    return res.json(merchant);
  }
}
