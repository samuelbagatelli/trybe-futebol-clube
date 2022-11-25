import * as express from 'express';
import { matchMiddlware, teamExists } from '../middlewares';
import ValidateJWT from '../auth';
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

router.post(
  '/',
  ValidateJWT.matchToken,
  matchMiddlware,
  teamExists,
  (req, res) => matchesController.createMatch(req, res),
);

router.patch(
  '/:id',
  (req, res) => matchesController.updateMatch(req, res),
);

router.patch(
  '/:id/finish',
  (req, res) => matchesController.finishMatch(req, res),
);

export default router;
