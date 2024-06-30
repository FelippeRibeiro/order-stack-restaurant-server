import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
