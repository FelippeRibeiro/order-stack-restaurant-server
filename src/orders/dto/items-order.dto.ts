import { IsNotEmpty, IsOptional } from 'class-validator';

export class ItemsOrderDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  qty: number;

  @IsOptional()
  description: string;
}
