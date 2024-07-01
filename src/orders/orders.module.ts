import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from 'src/entities/orderItems.entity';
import { Item } from 'src/items/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItems, Item])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
