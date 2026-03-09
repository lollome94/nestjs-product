import { ProductToken } from './product-token.value-object';

describe('ProductToken', () => {
  it('trims and stores token', () => {
    const token = ProductToken.fromString('  abc-123  ');

    expect(token.toString()).toBe('abc-123');
  });

  it('throws for empty token', () => {
    expect(() => ProductToken.fromString('   ')).toThrow(
      'ProductToken must not be empty',
    );
  });

  it('throws for too long token', () => {
    expect(() => ProductToken.fromString('x'.repeat(256))).toThrow(
      'ProductToken length must be <= 255',
    );
  });
});
