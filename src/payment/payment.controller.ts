import {
  Body,
  Controller,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { orderNumberDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPayment(@Body() orderNumber: orderNumberDto) {
    return await this.paymentService.createPayment(orderNumber.orderNumber);
  }
}
