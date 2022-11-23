import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import ValidateJWT from '../auth';

export default function loginMiddlware(req: Request, res: Response, next: NextFunction) {
  const customMessage = 'All fields must be filled';

  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': customMessage,
    }),
    password: Joi.string().required().messages({
      'string.empty': customMessage,
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
}

export const loginValidate = (req: Request, res: Response, next: NextFunction) => {
  ValidateJWT.token(req, res, next);

  next();
};
