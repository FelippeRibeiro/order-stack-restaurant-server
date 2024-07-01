import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { ItemsOrderDto } from './items-order.dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ItemsOrderDto)
  items: ItemsOrderDto[];

  @IsNotEmpty()
  customer: string;
}
