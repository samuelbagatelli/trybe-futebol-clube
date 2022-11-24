import { Request, Response } from 'express';

import { TeamService } from '../services';

export default class TeamController {
  teamService = new TeamService();

  async getAll(_req: Request, res: Response) {
    try {
      const teams = await this.teamService.getAll();

      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
