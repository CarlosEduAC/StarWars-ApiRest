import { Router } from 'express';
import { getMongoRepository } from "typeorm";

import CreatePlanetService from '@modules/planets/services/CreatePlanetService';
import DeletePlanetService from '@modules/planets/services/DeletePlanetService';

import Planet from '@modules/planets/infra/typeorm/entities/Planet';

const PlanetRouter = Router();

PlanetRouter.get('/', async (request, response) => {
  const planetRepository = getMongoRepository(Planet);

  const planets = await planetRepository.find();

  return response.json({ planets });
});

PlanetRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const planetRepository = getMongoRepository(Planet);

  const planet = await planetRepository.findOne(id);

  return response.json(planet);
});

PlanetRouter.get('/name/:name', async (request, response) => {
  const name = request.params;

  const planetRepository = getMongoRepository(Planet);

  const planet = await planetRepository.findOne(name);

  return response.json(planet);
});

PlanetRouter.post('/', async (request, response) => {
  const { name, climate, terrain } = request.body;

  const createPlanet = new CreatePlanetService();

  const planet = await createPlanet.execute({
    name,
    climate,
    terrain,
  });

  return response.json(planet);
});

PlanetRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deletePlanet = new DeletePlanetService();

  await deletePlanet.execute({ id });

  return response.status(204).send();
});

export default PlanetRouter;
