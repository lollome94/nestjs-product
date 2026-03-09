import { Product } from './product.entity';
import { Price } from '../value-objects/price.value-object';
import { ProductId } from '../value-objects/product-id.value-object';
import { ProductToken } from '../value-objects/product-token.value-object';
import { Stock } from '../value-objects/stock.value-object';

describe('Product entity', () => {
  it('creates product with normalized name', () => {
    const product = Product.create({
      id: ProductId.fromNumber(1),
      productToken: ProductToken.fromString('tok-1'),
      name: '  Demo Product  ',
      price: Price.fromNumber(10.5),
      stock: Stock.fromNumber(4),
    });

    expect(product.id?.toNumber()).toBe(1);
    expect(product.productToken.toString()).toBe('tok-1');
    expect(product.name).toBe('Demo Product');
    expect(product.price.toNumber()).toBe(10.5);
    expect(product.stock.toNumber()).toBe(4);
  });

  it('throws when name is empty after trim', () => {
    expect(() =>
      Product.create({
        productToken: ProductToken.fromString('tok-2'),
        name: '   ',
        price: Price.fromNumber(1),
        stock: Stock.fromNumber(0),
      }),
    ).toThrow('Product name must not be empty');
  });

  it('throws when name exceeds max length', () => {
    expect(() =>
      Product.create({
        productToken: ProductToken.fromString('tok-3'),
        name: 'x'.repeat(256),
        price: Price.fromNumber(1),
        stock: Stock.fromNumber(0),
      }),
    ).toThrow('Product name length must be <= 255');
  });
});
