import { getConnection } from 'typeorm';

import createConnection from '../../database';

import CreatePlanetService from '../../services/CreatePlanetService';
import DeletePlanetService from '../../services/DeletePlanetService';

describe('Consume Swapi', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = await getConnection();

    connection.close();
  });

  it('should be able to validate a not valid value', async (done) => {
    const createPlanet = new CreatePlanetService();

    try {
      await createPlanet.execute({
        name: '',
        climate: 'climate',
        terrain: 'terrain',
      });
    } catch (e) {
      expect(e.message).toBe("Please enter a valid value!");
    }

    done();
  });

  it('should be able to validate the existence of the planet', async (done) => {
    const createPlanet = new CreatePlanetService();
    const deletePlanet = new DeletePlanetService();

    const response = await createPlanet.execute({
      name: 'name',
      climate: 'climate',
      terrain: 'terrain',
    });

    try {
      await createPlanet.execute({
        name: 'name',
        climate: 'climate',
        terrain: 'terrain',
      });
    } catch (e) {
      expect(e.message).toBe("Planet does exists. Try another!");

      await deletePlanet.execute({ id: response.getId()});
    }

    done();
  });
});
