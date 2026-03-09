import { Product } from '../../../domain/entities/product.entity';
import { Price } from '../../../domain/value-objects/price.value-object';
import { ProductId } from '../../../domain/value-objects/product-id.value-object';
import { ProductToken } from '../../../domain/value-objects/product-token.value-object';
import { Stock } from '../../../domain/value-objects/stock.value-object';
import { ProductModel } from '../models/product.model';

export type ProductPersistence = {
  id?: number;
  productToken: string;
  name: string;
  price: string;
  stock: number;
};

export class ProductMapper {
  static toDomain(model: ProductModel): Product {
    return Product.create({
      id: ProductId.fromNumber(model.id),
      productToken: ProductToken.fromString(model.productToken),
      name: model.name,
      price: Price.fromNumber(Number(model.price)),
      stock: Stock.fromNumber(model.stock),
    });
  }

  static toPersistence(product: Product): ProductPersistence {
    return {
      id: product.id?.toNumber(),
      productToken: product.productToken.toString(),
      name: product.name,
      price: product.price.toNumber().toFixed(2),
      stock: product.stock.toNumber(),
    };
  }
}
