import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from 'src/entities/orderItems.entity';
import { Item } from 'src/items/entities/item.entity';
import { OrderStatusGateway } from './order-status.gateway';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItems, Item, Order])],
  providers: [OrderStatusGateway],
  exports: [OrderStatusGateway],
})
export class OrderStatusModule {}
