import * as express from 'express';
import { MatchesController } from '../controllers';

const router = express.Router();

const matchesController = new MatchesController();

router.get(
  '/',
  (req, res) => {
    if (req.query.inProgress) return matchesController.getAllInProgress(req, res);
    return matchesController.getAll(req, res);
  },
);

export default router;
