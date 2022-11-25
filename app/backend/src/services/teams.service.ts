import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  constructor(public teams = Teams) {}

  async getAll() {
    const teams = await this.teams.findAll();

    return teams;
  }

  async getById(id: string) {
    const team = await this.teams.findByPk(id);

    return team;
  }
}
