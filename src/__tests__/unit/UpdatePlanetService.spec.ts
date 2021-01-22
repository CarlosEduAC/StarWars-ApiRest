import { getConnection } from 'typeorm';

import createConnection from '../../database';

import CreatePlanetService from '../../services/CreatePlanetService';
import DeletePlanetService from '../../services/DeletePlanetService';
import UpdatePlanetService from '../../services/UpdatePlanetService';

describe('Consume Swapi', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = await getConnection();

    connection.close();
  });

  it('should be able to validate a not valid id', async (done) => {
    const updatePlanet = new UpdatePlanetService();

    try {
      await updatePlanet.execute({
        id: '',
        name: 'name',
        climate: 'climate',
        terrain: 'terrain',
        numberOfFilms: 1
      });
    } catch (e) {
      expect(e.message).toBe("Please enter a valid id!");
    }

    done();
  });

  it('should be able to validate a not valid planet', async (done) => {
    const updatePlanet = new UpdatePlanetService();

    try {
      await updatePlanet.execute({
        id: 'id1234567890',
        name: 'name',
        climate: 'climate',
        terrain: 'terrain',
        numberOfFilms: 1
      });
    } catch (e) {
      expect(e.message).toBe("Planet does not exists. Try again!");
    }

    done();
  });

  it('should be able to validate the not existence of the planet', async (done) => {
    const updatePlanet = new UpdatePlanetService();
    const createPlanet = new CreatePlanetService();
    const deletePlanet = new DeletePlanetService();

    const response = await createPlanet.execute({
      name: 'name',
      climate: 'climate',
      terrain: 'terrain',
    });
    try {
      await updatePlanet.execute({
        id: response.getId(),
        name: '',
        climate: 'climate',
        terrain: 'terrain',
        numberOfFilms: 1
      });
    } catch (e) {
      expect(e.message).toBe("Please enter a valid value!");

      await deletePlanet.execute({ id: response.getId()});
    }

    done();
  });
});
