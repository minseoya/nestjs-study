import { IsNumber, IsString } from 'class-validator';

export class orderDto {
  @IsString()
  totalAmount: number;

  @IsString()
  orderStatusId: number;
}
