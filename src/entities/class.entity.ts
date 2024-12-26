import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

}
