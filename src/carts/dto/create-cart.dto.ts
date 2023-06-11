import { IsNumber, IsOptional } from 'class-validator';

export class InputCartDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsNumber()
  readonly productItem: number;

  @IsNumber()
  readonly quantity: number;
}

export class CreateCartDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  readonly productItems: number;

  @IsNumber()
  readonly quantity: number;
}
