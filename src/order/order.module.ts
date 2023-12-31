import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { ProductModule } from 'src/product/product.module';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), ProductModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
