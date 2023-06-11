import { IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly productItems: number;

  @IsNumber()
  readonly quantity: number;
}
