import { Request, Response } from 'express';
import { getMongoRepository } from "typeorm";

import CreatePlanetService from '../services/CreatePlanetService';
import DeletePlanetService from '../services/DeletePlanetService';

import Planet from '../models/Planet';

export default class PlanetRepository {
  async show (request: Request, response: Response) {
    const planetRepository = getMongoRepository(Planet);

    const planets = await planetRepository.find();

    return response.status(201).json({ planets });
  }

  async findById (request: Request, response: Response) {
    const { id } = request.params;

    const planetRepository = getMongoRepository(Planet);

    const planet = await planetRepository.findOne(id);

    return response.json(planet);
  }

  async findByName (request: Request, response: Response) {
    const name = request.params;

    const planetRepository = getMongoRepository(Planet);

    const planet = await planetRepository.findOne(name);

    return response.json(planet);
  }

  async create (request: Request, response: Response) {
    const { name, climate, terrain } = request.body;

    const createPlanet = new CreatePlanetService();

    const planet = await createPlanet.execute({
      name,
      climate,
      terrain,
    });

    return response.json(planet);
  }

  async delete (request: Request, response: Response) {
    const { id } = request.params;

    const deletePlanet = new DeletePlanetService();

    await deletePlanet.execute({ id });

    return response.status(204).send();
  }
};
