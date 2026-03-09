import { Price } from './price.value-object';

describe('Price', () => {
  it('creates a valid non-negative price', () => {
    const price = Price.fromNumber(12.345);

    expect(price.toNumber()).toBe(12.35);
  });

  it('accepts zero', () => {
    const price = Price.fromNumber(0);

    expect(price.toNumber()).toBe(0);
  });

  it('throws for negative values', () => {
    expect(() => Price.fromNumber(-1)).toThrow(
      'Price must be a non-negative number',
    );
  });

  it('throws for non-finite values', () => {
    expect(() => Price.fromNumber(Number.NaN)).toThrow(
      'Price must be a non-negative number',
    );
    expect(() => Price.fromNumber(Number.POSITIVE_INFINITY)).toThrow(
      'Price must be a non-negative number',
    );
  });
});
