import * as express from 'express';
import ValidateJWT from '../auth';
import loginMiddlware from '../middlewares/login.middleware';
import UserController from '../controllers';

const router = express.Router();

const userController = new UserController();

router.post(
  '/',
  loginMiddlware,
  (req, res) => userController.login(req, res),
);

router.get(
  '/validate',
  ValidateJWT.token,
  (req, res) => res.status(200).json({ role: req.body.user.role }),
);

export default router;
