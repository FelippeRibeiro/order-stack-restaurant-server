import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { ItemsOrderDto } from './items-order.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemsOrderDto)
  @ArrayMinSize(1)
  items: ItemsOrderDto[];

  @IsNotEmpty()
  userName: string;
}
