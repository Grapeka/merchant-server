const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import users from '../db/users';
import dotenv from 'dotenv';
dotenv.config();

export async function generateToken(
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user === undefined) {
    return res.sendStatus(403);
  }
  const accessToken = jwt.sign(
    { email, password },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '2h' }
  );

  return res.json({ accessToken });
}

export async function register(req: Request, res: Response) {
  const { firstname, lastname, email, password } = req.body;

  const user = {
    id: users.length + 1,
    firstname,
    lastname,
    email,
    password,
  };

  // db
  users.push(user);

  return res.json(users);
}

export async function getUser(
  req: any,
  res: Response
): Promise<Response<any, Record<string, any>>> {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  return res.json(user);
}
