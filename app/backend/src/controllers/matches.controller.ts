import { Request, Response } from 'express';

import { MatchesService } from '../services';

export default class MatchesController {
  matchesService = new MatchesService();

  async getAll(_req: Request, res: Response) {
    const matches = await this.matchesService.getAll();

    return res.status(200).json(matches);
  }

  async getAllInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;

    const bool = JSON.parse(inProgress as string);

    const matches = await this.matchesService.getAllInProgress(bool);

    return res.status(200).json(matches);
  }

  async createMatch(req: Request, res: Response) {
    const match = await this.matchesService.createMatch(req.body);

    return res.status(201).json(match);
  }

  async finishMatch(req: Request, res: Response) {
    const id = JSON.parse(req.params.id);

    await this.matchesService.finishMatch(id);

    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const id = JSON.parse(req.params.id);

    const { homeTeamGoals, awayTeamGoals } = req.body;

    const match = await this.matchesService.getMatch(id);

    if (!match?.inProgress) {
      return res.status(400).json({ message: 'The match has already finished' });
    }

    await this.matchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Match updated' });
  }
}
