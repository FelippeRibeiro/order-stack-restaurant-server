import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Item } from './items/entities/item.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItems } from './entities/orderItems.entity';
import { OrderStatusGateway } from './order-status/order-status.gateway';

@Module({
  imports: [
    //TODO Add this to a .env file and use nestjs configuration strategy asap
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'restaurant',
      entities: [Item, Order, OrderItems],
      synchronize: true,
    }),
    OrdersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService, OrderStatusGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
