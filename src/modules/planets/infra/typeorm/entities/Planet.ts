import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
class Planet {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  climate: string;

  @Column()
  numberOfFilms: number;

  @Column()
  terrain: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Planet;
