import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm'; // Cambia TransactionManager por EntityManager
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async updateProductStock(
    productId: number,
    quantity: number,
    manager?: EntityManager,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new Error(`Producto con ID ${productId} no encontrado.`);
    }

    product.stock += quantity;

    if (manager) {
      await manager.save(product);
    } else {
      await this.productRepository.save(product);
    }
  }
}
