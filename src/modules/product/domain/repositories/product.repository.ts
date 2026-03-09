import { Product } from '../entities/product.entity';
import { ProductId } from '../value-objects/product-id.value-object';
import { ProductToken } from '../value-objects/product-token.value-object';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: ProductId): Promise<Product | null>;
  findByProductToken(productToken: ProductToken): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}
