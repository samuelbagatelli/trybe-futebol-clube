'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        homeTeam: {
          type: Sequelize.INTEGER,
          field: 'home_team',
          allowNull: false,
        },
        homeTeamGoals: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'home_team_goals'
        },
        awayTeam: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'away_team'
        },
        awayTeamGoals: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'away_team_goals'
        },
        inProgress: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          field: 'in_progress',
        }
      }
    )
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
