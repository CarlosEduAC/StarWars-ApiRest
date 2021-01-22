import { getConnection } from 'typeorm';

import createConnection from '../../database';

import DeletePlanetService from '../../services/DeletePlanetService';

describe('Consume Swapi', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = await getConnection();

    connection.close();
  });

  it('should be able to validate the not existence of a planet', async (done) => {
    const deletePlanet = new DeletePlanetService();

    try {
      await deletePlanet.execute({ id: 'id1234567890' });
    } catch (e) {
      expect(e.message).toBe("Planet does not exists!");
    }

    done();
  });
});
