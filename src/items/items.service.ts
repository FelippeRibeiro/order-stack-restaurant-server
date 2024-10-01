import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private itemsRepository: Repository<Item>) {}

  create(createItemDto: CreateItemDto) {
    const item = this.itemsRepository.create({ ...createItemDto });
    return this.itemsRepository.save(item);
  }

  findAll() {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
    try {
      const item = this.itemsRepository.findOneOrFail({ where: { id } });
      return item;
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemsRepository.update(id, updateItemDto);
  }

  remove(id: number) {
    return this.itemsRepository.delete({ id });
  }
}
