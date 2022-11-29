import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = express.Router();

const leaderboardController = new LeaderboardController();

router.get(
  '/home',
  (req, res) => leaderboardController.createLeaderboard(req, res),
);

export default router;
