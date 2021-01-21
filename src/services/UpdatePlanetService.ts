import { getMongoManager } from "typeorm";
import { validate } from "class-validator";
import { ObjectID } from 'mongodb';

import AppError from '../errors/AppError';

import Planet from '../models/Planet';

interface Request {
  id: string;
  name: string;
  climate: string;
  numberOfFilms: number;
  terrain: string;
}

class UpdatePlanetService {
  public async execute({ id, name, climate, numberOfFilms, terrain }: Request): Promise<Planet> {
    if (!ObjectID.isValid(id)) {
      throw new AppError('Please enter a valid id!');
    }

    const planetManager = getMongoManager();

    const checkPlanetExists = await planetManager.findOne(Planet, id);

    if (!checkPlanetExists) {
      throw new AppError('Planet does not exists. Try again!');
    }

    const planet = checkPlanetExists;

    planet.setName(name);
    planet.setClimate(climate);
    planet.setNumberOfFilms(numberOfFilms);
    planet.setTerrain(terrain);

    const validatePlanet = await validate(planet);

    if (validatePlanet.length > 0) {
      throw new AppError('Please enter a valid value!');
    }

    await planetManager.save(Planet, planet);

    return planet;
  }
}

export default UpdatePlanetService;
