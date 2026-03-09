import { ProductId } from './product-id.value-object';

describe('ProductId', () => {
  it('creates a positive integer id', () => {
    const id = ProductId.fromNumber(123);

    expect(id.toNumber()).toBe(123);
  });

  it('throws for zero or negative values', () => {
    expect(() => ProductId.fromNumber(0)).toThrow(
      'ProductId must be a positive integer',
    );
    expect(() => ProductId.fromNumber(-10)).toThrow(
      'ProductId must be a positive integer',
    );
  });

  it('throws for non-integer values', () => {
    expect(() => ProductId.fromNumber(1.2)).toThrow(
      'ProductId must be a positive integer',
    );
  });
});
