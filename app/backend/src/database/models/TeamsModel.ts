import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

Matches.belongsTo(Teams, { foreignKey: 'id', as: 'team_id' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'home_team' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'away_team' });

export default Teams;
