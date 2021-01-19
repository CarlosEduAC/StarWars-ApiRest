import { getMongoRepository } from "typeorm";

import AppError from '../errors/AppError';

import Planet from '../models/Planet';

interface Request {
  id: string;
}

class DeletePlanetService {
  public async execute({ id }: Request): Promise<void> {
    const planetRepository = getMongoRepository(Planet);

    const checkPlanetExists = await planetRepository.findOne(id);

    if (!checkPlanetExists) {
      throw new AppError('Planet does not exists!');
    }

    await planetRepository.remove(checkPlanetExists);
  }
}

export default DeletePlanetService;
