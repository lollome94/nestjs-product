import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductId } from '../../../domain/value-objects/product-id.value-object';
import { ProductToken } from '../../../domain/value-objects/product-token.value-object';
import { ProductMapper } from '../mappers/product.mapper';
import { ProductModel } from '../models/product.model';

@Injectable()
export class SequelizeProductRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: typeof ProductModel,
  ) {}

  async save(product: Product): Promise<Product> {
    const values = ProductMapper.toPersistence(product);

    let saved: ProductModel | null;

    if (product.id) {
      const id = product.id.toNumber();
      await this.productModel.update(values, { where: { id } });
      saved = await this.productModel.findByPk(id);
    } else {
      const { id: _ignored, ...createValues } = values;
      saved = await this.productModel.create(createValues);
    }

    if (!saved) {
      throw new Error('Failed to save product');
    }

    return ProductMapper.toDomain(saved);
  }

  async findById(id: ProductId): Promise<Product | null> {
    const model = await this.productModel.findByPk(id.toNumber());

    return model ? ProductMapper.toDomain(model) : null;
  }

  async findByProductToken(productToken: ProductToken): Promise<Product | null> {
    const model = await this.productModel.findOne({
      where: { productToken: productToken.toString() },
    });

    return model ? ProductMapper.toDomain(model) : null;
  }

  async findAll(): Promise<Product[]> {
    const models = await this.productModel.findAll();

    return models.map((model) => ProductMapper.toDomain(model));
  }
}
