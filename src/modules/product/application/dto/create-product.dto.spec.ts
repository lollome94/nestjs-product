import { validate } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

describe('CreateProductDto validation', () => {
  it('accepts a valid payload', async () => {
    const dto = new CreateProductDto();
    dto.name = 'Demo Product';
    dto.productToken = 'tok-123';
    dto.price = 49.99;
    dto.stock = 10;

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('rejects invalid name and productToken length', async () => {
    const dto = new CreateProductDto();
    dto.name = 'a'.repeat(256);
    dto.productToken = 'b'.repeat(256);
    dto.price = 10;
    dto.stock = 1;

    const errors = await validate(dto);

    const properties = errors.map((error) => error.property);
    expect(properties).toContain('name');
    expect(properties).toContain('productToken');
  });

  it('rejects invalid price values', async () => {
    const dto = new CreateProductDto();
    dto.name = 'Demo Product';
    dto.productToken = 'tok-123';
    dto.price = -1;
    dto.stock = 1;

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'price')).toBe(true);
  });

  it('rejects non-integer and negative stock', async () => {
    const dto = new CreateProductDto();
    dto.name = 'Demo Product';
    dto.productToken = 'tok-123';
    dto.price = 1.5;
    dto.stock = -3.2 as unknown as number;

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'stock')).toBe(true);
  });
});
