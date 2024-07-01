import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItems } from 'src/entities/orderItems.entity';
import { Item } from 'src/items/entities/item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItems) private orderItemsRepository: Repository<OrderItems>,
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {}

  findAll() {
    return this.orderRepository.find({ where: { id: 1 }, relations: ['orderItems'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
