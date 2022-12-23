const jwt = require('jsonwebtoken');
import { IMerchant } from '../db/users';
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  // get the token from the header if present
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // if there isn't any token
  if (token == null) return res.sendStatus(401);

  // verify the token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, user: IMerchant) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
}
