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
}
