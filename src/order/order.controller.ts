import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Lista todos los usuarios registrados',
  })
  async createOrder(
    @Body() orderData: { customer_name: string; total_amount: number },
  ) {
    try {
      await this.orderService.createOrderWithTransaction(orderData);
      return { message: 'Pedido creado con éxito' };
    } catch (error) {
      // Manejar el error y devolver una respuesta adecuada
      throw new HttpException(
        'Error al crear el pedido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
