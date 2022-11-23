import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UsersModel';

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class ValidateJWT {
  static async token(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      const decoded: jwt.JwtPayload | Users | string = jwt.verify(token, secret);

      req.body.user = decoded;

      next();
    } catch (e) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  }
}
