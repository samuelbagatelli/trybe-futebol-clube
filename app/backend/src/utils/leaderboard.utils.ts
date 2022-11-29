import Teams from '../database/models/Teams.model';
import Matches from '../database/models/Matches.model';

const info = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};

const totalPoints = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals > awayTeamGoals) return 3;
  if (awayTeamGoals > homeTeamGoals) return 0;
  return 1;
};

const getHomeInfo = (matches: Matches[], team: Teams) => {
  const leaderboard = matches.reduce((acc, curr) => {
    if (team.id === curr.homeTeam) {
      const { homeTeamGoals, awayTeamGoals } = curr;

      acc.totalPoints += totalPoints(homeTeamGoals, awayTeamGoals);

      acc.goalsFavor += homeTeamGoals;

      acc.goalsOwn += awayTeamGoals;

      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;

      if (totalPoints(homeTeamGoals, awayTeamGoals) === 3) acc.totalVictories += 1;
      if (totalPoints(homeTeamGoals, awayTeamGoals) === 0) acc.totalLosses += 1;
      if (totalPoints(homeTeamGoals, awayTeamGoals) === 1) acc.totalDraws += 1;

      acc.totalGames = acc.totalDraws + acc.totalLosses + acc.totalVictories;

      acc.efficiency = ((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2);
      console.log(team.teamName, acc);
    }

    return acc;
  }, { ...info });

  return leaderboard;
};

export default getHomeInfo;
