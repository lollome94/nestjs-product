import { Stock } from './stock.value-object';

describe('Stock', () => {
  it('creates a valid integer stock', () => {
    const stock = Stock.fromNumber(10);

    expect(stock.toNumber()).toBe(10);
  });

  it('accepts zero', () => {
    const stock = Stock.fromNumber(0);

    expect(stock.toNumber()).toBe(0);
  });

  it('throws for negative values', () => {
    expect(() => Stock.fromNumber(-1)).toThrow(
      'Stock must be a non-negative integer',
    );
  });

  it('throws for non-integer values', () => {
    expect(() => Stock.fromNumber(1.5)).toThrow(
      'Stock must be a non-negative integer',
    );
  });
});
