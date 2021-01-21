import { getMongoManager } from "typeorm";
import { validate } from "class-validator";

import ConsumeSwapiService from './ConsumeSwapiService';

import AppError from '../errors/AppError';

import Planet from '../models/Planet';

interface Request {
  name: string;
  climate: string;
  terrain: string;
}

class CreatePlanetService {
  public async execute({ name, climate, terrain }: Request): Promise<Planet> {
    const consumeSwapi = new ConsumeSwapiService()

    const { numberOfFilms } = await consumeSwapi.execute({ name });

    const planet = new Planet(name, climate, numberOfFilms, terrain);

    const validatePlanet = await validate(planet);

    if (validatePlanet.length > 0) {
      throw new AppError('Please enter a valid value!');
    }

    const planetManager = getMongoManager();

    const checkPlanetExists = await planetManager.findOne<object>(Planet, {
      name
    });

    if (Boolean(checkPlanetExists)) {
      throw new AppError('Planet does exists. Try another!');
    }

    await planetManager.save(planet);

    return planet;
  }
}

export default CreatePlanetService;
