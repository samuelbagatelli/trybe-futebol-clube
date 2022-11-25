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
