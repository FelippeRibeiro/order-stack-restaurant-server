import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Item } from './items/entities/item.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItems } from './entities/orderItems.entity';
import { OrderStatusModule } from './order-status/order-status.module';

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
    OrderStatusModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

//TODO reverter quantidade de itens caso o pedido seja cancelado (linha 43 e 44 do order.service)
//TODO retirar a propriedade nome do items-orders-dto
//TODO retornar o id do item que não tem em estoque e a quantidade em estoque
//TODO validar se a quantidade de itens do pedido é maior que 0
