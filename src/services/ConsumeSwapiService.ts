import axios from "axios";

import AppError from '../errors/AppError';

interface Request {
  name: string;
}

interface Response {
  numberOfFilms: number;
}

class ConsumeSwapiService {
  public async execute({ name }: Request): Promise<Response> {
    try {
      const planetsSwapi = await axios.get(`https://swapi.dev/api/planets/?search=${name}`);

      const numberOfFilms = planetsSwapi.data.count === 1
        ? planetsSwapi.data.results[0].films.length
        : 0;

      return { numberOfFilms };
    } catch {
      throw new AppError('Please enter a valid planet name!');
    }
  }
}

export default ConsumeSwapiService;
