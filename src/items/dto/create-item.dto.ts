import { Item } from '../entities/item.entity';
import { IsNotEmpty, IsOptional, IsString, Min, IsPositive } from 'class-validator';

export class CreateItemDto extends Item {
  @IsOptional()
  description: string;

  @IsOptional()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  price: number;

  @IsNotEmpty()
  qty: number;
}
