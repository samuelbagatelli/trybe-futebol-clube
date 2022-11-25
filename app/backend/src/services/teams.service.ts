import Teams from '../database/models/TeamsModel';

export default class TeamService {
  constructor(public teams = Teams) {}

  async getAll(): Promise<Teams[]> {
    const teams = await this.teams.findAll();

    return teams;
  }

  async getById(id: string) {
    const team = await this.teams.findByPk(id);

    return team;
  }
}
