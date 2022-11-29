import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import { Op } from 'sequelize';
import Teams from '../database/models/Teams.model';

export default function matchMiddlware(req: Request, res: Response, next: NextFunction) {
  const customMessage = 'It is not possible to create a match with two equal teams';

  const { homeTeam } = req.body;

  const schema = Joi.object({
    homeTeam: Joi.number().required(),
    awayTeam: Joi.number().required().disallow(homeTeam),
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
    user: Joi.object().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(422).json({ message: customMessage });

  next();
}

export const teamExists = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const teams = await Teams.findAll({
    where: {
      [Op.or]: [{ id: homeTeam }, { id: awayTeam }],
    },
  });

  console.log(teams);

  if (teams.length === 1) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};
