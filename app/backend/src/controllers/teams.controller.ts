import { Request, Response } from 'express';

import { TeamsService } from '../services';

export default class TeamsController {
  teamService = new TeamsService();

  async getAll(_req: Request, res: Response) {
    try {
      const teams = await this.teamService.getAll();

      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const team = await this.teamService.getById(id);

      return res.status(200).json(team);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
