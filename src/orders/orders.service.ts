import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
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
  async create(createOrderDto: CreateOrderDto) {
    const { items, customer } = createOrderDto;

    const order = this.orderRepository.create({ customer });

    const status: {
      amount: number;
      removedItems: { id: number; message: string }[];
    } = {
      amount: 0,
      removedItems: [],
    };
    for (const item of items) {
      const { id, qty, description } = item;
      const selectedItem = await this.itemsRepository.findOne({ where: { id } });

      if (!selectedItem || selectedItem.qty < qty) {
        await this.orderItemsRepository.delete({ order: { id: order.id } });
        await this.orderRepository.delete({ id: order.id });
        throw new HttpException({ message: !selectedItem ? 'Item not found' : 'Not enough stock' }, 400);
      }

      selectedItem.qty -= qty;
      await this.itemsRepository.save(selectedItem);
      await this.orderItemsRepository.save({ qty, description, item: selectedItem, order });
      status.amount += selectedItem.price * qty;
    }

    return this.orderRepository.save({ ...order, total: status.amount });
  }

  findAll() {
    return this.orderRepository.find({ relations: ['orderItems'] });
  }

  async findOne(id: number) {
    try {
      const order = await this.orderRepository.findOneOrFail({ where: { id }, relations: ['orderItems'] });
      return order;
    } catch (error) {
      throw new NotFoundException('Order not found');
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
