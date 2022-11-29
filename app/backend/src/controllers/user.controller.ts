import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

import Users from '../database/models/Users.model';
import UserService from '../services/user.service';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserController {
  userService = new UserService();

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user: Users | null = await this.userService
        .getOne(email);

      if (!user || !compareSync(password, user?.password)) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      const token = jwt.sign({
        id: user?.id,
        username: user?.username,
        email: user?.email,
        role: user?.role,
      }, secret);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Error interno', error });
    }
  }
}
