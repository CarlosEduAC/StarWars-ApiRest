import { Router } from 'express';
import PlanetRepository from '../repositories/PlanetRepository';

const PlanetRouter = Router();
const planetRepository = new PlanetRepository();

PlanetRouter.get('/', planetRepository.show);

PlanetRouter.get('/:id', planetRepository.findById);

PlanetRouter.get('/name/:name', planetRepository.findByName);

PlanetRouter.post('/', planetRepository.create);

PlanetRouter.delete('/:id', planetRepository.delete);

export default PlanetRouter;
