import { IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  readonly user_id: number;

  @IsNumber()
  readonly product_items: number;

  @IsNumber()
  readonly quantity: number;
}
