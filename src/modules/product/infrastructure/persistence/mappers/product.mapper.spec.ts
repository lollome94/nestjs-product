import { Product } from '../../../domain/entities/product.entity';
import { Price } from '../../../domain/value-objects/price.value-object';
import { ProductId } from '../../../domain/value-objects/product-id.value-object';
import { ProductToken } from '../../../domain/value-objects/product-token.value-object';
import { Stock } from '../../../domain/value-objects/stock.value-object';
import { ProductMapper } from './product.mapper';

describe('ProductMapper', () => {
  const makeProduct = (): Product =>
    Product.create({
      id: ProductId.fromNumber(7),
      productToken: ProductToken.fromString('tok-map'),
      name: 'Mapped Product',
      price: Price.fromNumber(12.3),
      stock: Stock.fromNumber(9),
    });

  it('maps domain to persistence', () => {
    const product = makeProduct();

    const persistence = ProductMapper.toPersistence(product);

    expect(persistence).toEqual({
      id: 7,
      productToken: 'tok-map',
      name: 'Mapped Product',
      price: '12.30',
      stock: 9,
    });
  });

  it('maps persistence to domain', () => {
    const modelLike = {
      id: 11,
      productToken: 'tok-persist',
      name: 'Persisted Product',
      price: '99.99',
      stock: 13,
    };

    const domain = ProductMapper.toDomain(modelLike as never);

    expect(domain.id?.toNumber()).toBe(11);
    expect(domain.productToken.toString()).toBe('tok-persist');
    expect(domain.name).toBe('Persisted Product');
    expect(domain.price.toNumber()).toBe(99.99);
    expect(domain.stock.toNumber()).toBe(13);
  });
});
