import ConsumeSwapiService from '../../services/ConsumeSwapiService';

describe('Consume Swapi', () => {
  it('should be able to validate planet', async () => {
    const consumeSwapi = new ConsumeSwapiService()
    const planetName = 'Tatooine';

    const { numberOfFilms } = await consumeSwapi.execute({ name: planetName });

    expect(numberOfFilms).toBe(5);
  });
});
