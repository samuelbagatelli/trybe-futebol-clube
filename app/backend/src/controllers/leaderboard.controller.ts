import { Request, Response } from 'express';
import { MatchesService, TeamsService } from '../services';
import getHomeInfo from '../utils';

export default class LeaderboardController {
  matchesService = new MatchesService();
  teamsService = new TeamsService();

  async createLeaderboard(_req: Request, res: Response) {
    const matches = await this.matchesService.getAllInProgress(false);
    const teams = await this.teamsService.getAll();

    const leaderboard = teams.map((team) => ({
      name: team.teamName,
      ...getHomeInfo(matches, team),
    }));

    const test = leaderboard.sort((a, b) => {
      const sort = b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn;

      return sort;
    });

    return res.status(200).json(test);
  }
}
