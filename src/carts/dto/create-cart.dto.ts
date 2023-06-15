import { IsNumber, IsOptional } from 'class-validator';

export class InputCartDto {
  @IsNumber()
  readonly productItem: number;

  @IsNumber()
  readonly quantity: number;
}

export class UpdateCartDto {
  @IsNumber()
  id: number;

  @IsNumber()
  quantity: number;
}
