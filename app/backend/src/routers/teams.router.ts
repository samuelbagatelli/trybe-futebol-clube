import * as express from 'express';
import { TeamController } from '../controllers';

const router = express.Router();

const teamsController = new TeamController();

router.get(
  '/',
  (req, res) => teamsController.getAll(req, res),
);

router.get(
  '/:id',
  (req, res) => teamsController.getById(req, res),
);

export default router;
