import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
}
