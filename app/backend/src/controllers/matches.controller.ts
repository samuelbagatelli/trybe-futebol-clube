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
}
