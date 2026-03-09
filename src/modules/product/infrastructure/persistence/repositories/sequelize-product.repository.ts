import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../../../domain/entities/product.entity';
import { ProductId } from '../../../domain/value-objects/product-id.value-object';
import { ProductToken } from '../../../domain/value-objects/product-token.value-object';
import { ProductMapper } from '../mappers/product.mapper';
import { ProductModel } from '../models/product.model';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: ProductId): Promise<Product | null>;
  findByProductToken(productToken: ProductToken): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findPaginated(
    offset: number,
    limit: number,
  ): Promise<{ items: Product[]; total: number }>;
  deleteById(id: ProductId): Promise<boolean>;
}

@Injectable()
export class SequelizeProductRepository implements IProductRepository {
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
      saved = await this.productModel.create(values);
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

  async findByProductToken(
    productToken: ProductToken,
  ): Promise<Product | null> {
    const model = await this.productModel.findOne({
      where: { productToken: productToken.toString() },
    });

    return model ? ProductMapper.toDomain(model) : null;
  }

  async findAll(): Promise<Product[]> {
    const models = await this.productModel.findAll();

    return models.map((model) => ProductMapper.toDomain(model));
  }

  async findPaginated(
    offset: number,
    limit: number,
  ): Promise<{ items: Product[]; total: number }> {
    const { rows, count } = await this.productModel.findAndCountAll({
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    return {
      items: rows.map((model) => ProductMapper.toDomain(model)),
      total: count,
    };
  }

  async deleteById(id: ProductId): Promise<boolean> {
    const deletedRows = await this.productModel.destroy({
      where: { id: id.toNumber() },
    });

    return deletedRows > 0;
  }
}
