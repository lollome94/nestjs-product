import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from './domain/repositories/product.repository';
import { ProductModel } from './infrastructure/persistence/models/product.model';
import { SequelizeProductRepository } from './infrastructure/persistence/repositories/sequelize-product.repository';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: SequelizeProductRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}

export type ProductRepositoryPort = ProductRepository;
