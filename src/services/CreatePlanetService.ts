import { getMongoManager } from "typeorm";
import axios from 'axios';

import AppError from '../errors/AppError';

import Planet from '../models/Planet';

interface Request {
  name: string;
  climate: string;
  terrain: string;
}

class CreatePlanetService {
  public async execute({ name, climate, terrain }: Request): Promise<Planet> {
    const planet = new Planet();

    if (!name && !climate && !terrain) {
      throw new AppError('Please enter a valid value!');
    }

    try {
      const planetsSwapi = await axios.get(`https://swapi.dev/api/planets/?search=${name}`);

      planet.name = name;
      planet.climate = climate;
      planet.terrain = terrain;
      planet.numberOfFilms = planetsSwapi.data.count === 1
                              ? planetsSwapi.data.results[0].films.length
                              : 0;
    } catch {
      throw new AppError('Please enter a valid planet name!');
    }

    const planetManager = getMongoManager();
    await planetManager.save(planet);

    return planet;
  }
}

export default CreatePlanetService;
