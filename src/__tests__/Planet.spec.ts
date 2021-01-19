import request from 'supertest';
import { ObjectID } from 'mongodb';
import { getMongoRepository } from "typeorm";

import app from '../app';
import Planet from '../models/Planet';

describe('Planet', () => {


  it('should be able to list the planets', async () => {
    await request(app).post('/planets').send({
      name: 'Tatooine',
      climate: 'Arid',
      terrain: 'Desert'
    });

    await request(app).post('/planets').send({
      name: 'Alderaan',
      climate: 'Temperate',
      terrain: 'Grasslands, Mountains'
    });

    const response = await request(app).get('/planets');

    expect(response.body.planets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: 'Tatooine',
          climate: 'Arid',
          terrain: 'Desert',
          numberOfFilms: 5
        }),
        expect.objectContaining({
          id: expect.any(String),
          name: 'Alderaan',
          climate: 'Temperate',
          terrain: 'Grasslands, Mountains',
          numberOfFilms: 2
        }),
        // expect.objectContaining({
        //   id: expect.any(String),
        //   name: 'Yavin IV',
        //   climate: 'Temperate, Tropical',
        //   terrain: 'Jungle, Rainforests',
        //   numberOfFilms: 1
        // }),
      ]),
    );
  });

  it('should be able to create a new planet', async () => {
    const response = await request(app).post('/planets').send({
      name: 'Yavin IV',
      climate: 'Temperate, Tropical',
      terrain: 'Jungle, Rainforests'
    });

    expect(ObjectID.isValid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      name: 'Yavin IV',
      climate: 'Temperate, Tropical',
      terrain: 'Jungle, Rainforests',
      numberOfFilms: 1
    });
  });

  it('should be able to find the planet by the id', async () => {
    const response = await request(app).post('/planets').send({
      name: 'Dagobah',
      climate: 'Murky',
      terrain: 'Swamp, Jungles'
    });

    const planetsRepository = getMongoRepository(Planet);

    const planet = await planetsRepository.findOne(response.body.id);

    expect(planet).toMatchObject({
      name: 'Dagobah',
      climate: 'Murky',
      terrain: 'Swamp, Jungles',
      numberOfFilms: 3
    });
  });

  it('should be able to find the planet by the name', async () => {
    const response = await request(app).get('/planets/name/Tatooine');

    expect(response.body).toMatchObject({
      name: 'Tatooine',
      climate: 'Arid',
      terrain: 'Desert',
      numberOfFilms: 5
    });
  });

  it('should be able to delete a planet', async () => {
    const planetsRepository = getMongoRepository(Planet);

    const response = await request(app).post('/planets').send({
      name: 'Hoth',
      climate: 'Frozen',
      terrain: 'Tundra, Ice Caves, Mountain Ranges'
    });

    await request(app).delete(`/planets/${response.body.id}`);

    const planet = await planetsRepository.findOne(response.body.id);

    expect(planet).toBeFalsy();
  });
});
