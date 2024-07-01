import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'order_items' })
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  qty: number;

  @Column({ default: '', nullable: true })
  description: string;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order; // Removido orderId, utilizando a entidade Order diretamente

  @ManyToOne(() => Item, (item) => item.orderItems)
  item: Item; // Removido itemId, utilizando a entidade Item diretamente
}
