import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
} from 'typeorm';

import { IsInt, Length } from "class-validator";

@Entity()
class Planet {
  @ObjectIdColumn()
  private id: string;

  @Column()
  @Length(1, 120)
  private name: string;

  @Column()
  @Length(1, 120)
  private climate: string;

  @Column()
  @IsInt()
  private numberOfFilms: number;

  @Column()
  @Length(1, 120)
  private terrain: string;

  @CreateDateColumn()
  private created_at: Date;

  constructor(name: string, climate: string, numberOfFilms: number, terrain: string) {
    this.name = name;
    this.climate = climate;
    this.numberOfFilms = numberOfFilms;
    this.terrain = terrain;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setClimate(climate: string) {
    this.climate = climate;
  }

  public setNumberOfFilms(numberOfFilms: number) {
    this.numberOfFilms = numberOfFilms;
  }

  public setTerrain(terrain: string) {
    this.terrain = terrain;
  }
}

export default Planet;
