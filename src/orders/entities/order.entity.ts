import { Item } from 'src/items/entities/item.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @Column({ enum: ['pending', 'done', 'cancelled'], default: 'pending', nullable: false, type: 'enum' })
  status: 'pending' | 'done' | 'cancelled';

  @Column({ nullable: true, default: '' })
  note: string;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  finshedAt: Date;
}
