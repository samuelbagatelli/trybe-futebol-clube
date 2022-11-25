import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

export default class MatchesService {
  constructor(public matches = Matches) { }

  async getAll() {
    const matches = await this.matches.findAll(
      {
        include: [{
          model: Teams,
          as: 'teamHome',
        },
        {
          model: Teams,
          as: 'teamAway',
        },
        ],
      },
    );

    return matches;
  }

  async getAllInProgress(inProgress: boolean) {
    const matches = await this.matches.findAll(
      {
        include: [{
          model: Teams,
          as: 'teamHome',
        },
        {
          model: Teams,
          as: 'teamAway',
        },
        ],
        where: {
          inProgress,
        },
      },
    );

    return matches;
  }

  async createMatch(matchInfo: Matches) {
    const match = await this.matches.create({
      ...matchInfo,
      inProgress: true,
    });

    return match;
  }

  async finishMatch(id: number): Promise<void> {
    await this.matches.update(
      { inProgress: false },
      {
        where: {
          id,
        },
      },
    );
  }

  async getMatch(id: number) {
    const match = await this.matches.findByPk(id);

    return match;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.matches.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}
