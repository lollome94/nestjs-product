import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from './domain/repositories/product.repository';
import { ProductService } from './application/services/product.service';
import { ProductModel } from './infrastructure/persistence/models/product.model';
import { SequelizeProductRepository } from './infrastructure/persistence/repositories/sequelize-product.repository';
import { ProductController } from './presentation/controllers/product.controller';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: SequelizeProductRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY, ProductService],
})
export class ProductModule {}

export type ProductRepositoryPort = ProductRepository;
