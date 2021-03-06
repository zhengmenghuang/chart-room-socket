import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm/index';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createDate: Date;
}
