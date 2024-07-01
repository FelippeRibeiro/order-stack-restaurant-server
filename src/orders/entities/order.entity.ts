import { OrderItems } from 'src/entities/orderItems.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  //TODO there will come the user informations
  @Column({ nullable: false, type: 'varchar' })
  customer: string;

  @Column({ enum: ['waitapproval', 'pending', 'done', 'cancelled'], default: 'waitapproval', nullable: false, type: 'enum' })
  status: 'waitapproval' | 'pending' | 'done' | 'cancelled';

  @Column({ nullable: true, default: '' })
  note: string;

  @Column({ nullable: false, type: 'float', default: 0 })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, default: null })
  finshedAt?: Date;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems: OrderItems[];
}
