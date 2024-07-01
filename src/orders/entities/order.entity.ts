import { OrderItems } from 'src/entities/orderItems.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  //TODO there will come the user informations
  @Column({ nullable: false, type: 'varchar' })
  customer: string;

  @Column({ enum: ['pending', 'done', 'cancelled'], default: 'pending', nullable: false, type: 'enum' })
  status: 'pending' | 'done' | 'cancelled';

  @Column({ nullable: true, default: '' })
  note: string;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, default: null })
  finshedAt?: Date;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems: OrderItems[];
}
