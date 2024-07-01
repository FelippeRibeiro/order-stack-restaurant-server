import { OrderItems } from 'src/entities/orderItems.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '', nullable: true })
  description: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column({ default: '', nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.item)
  orderItems: OrderItems[];
}
