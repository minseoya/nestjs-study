import { IsNumber, IsString } from 'class-validator';

export class paymentDto {
  @IsString()
  totalAmount: number;

  @IsString()
  orderStatusId: number;
}

export class orderNumberDto {
  @IsString()
  orderNumber: string;
}
