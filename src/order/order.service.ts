import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductService } from '../product/product.service';

/*
Explicacion 
En resumen, este método createOrderWithTransaction utiliza un queryRunner para gestionar 
la transacción. La transacción comienza con startTransaction(), 
y dentro del bloque try, se crean registros en la tabla de pedidos y 
se actualiza el stock de productos. Si ocurre algún error 
(por ejemplo, si el monto del pedido es negativo), 
la transacción se revierte usando rollbackTransaction(). 
Finalmente, en el bloque finally, se libera el queryRunner para liberar los recursos.

Este enfoque garantiza que si ocurre algún error 
durante la creación del pedido o la actualización del stock de productos, 
la transacción se revertirá para mantener la consistencia de la base de datos. 
Si todo va bien, la transacción se confirmará y los cambios se guardarán en la base de datos.
*/
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly productService: ProductService,
  ) {}

  async createOrderWithTransaction(orderData: {
    customer_name: string;
    total_amount: number;
  }) {
    const queryRunner =
      this.orderRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newOrder = new OrderEntity();
      newOrder.customer_name = orderData.customer_name;
      newOrder.total_amount = orderData.total_amount;
      await queryRunner.manager.save(newOrder);

      if (newOrder.total_amount < 0) {
        throw new Error('Monto total del pedido no válido');
      }

      const productId = 1;
      const quantity = 5;
      await this.productService.updateProductStock(
        productId,
        -quantity,
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
