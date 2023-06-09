import { IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  readonly user_id: number;

  @IsNumber()
  readonly productItems: number;

  @IsNumber()
  readonly quantity: number;
}
