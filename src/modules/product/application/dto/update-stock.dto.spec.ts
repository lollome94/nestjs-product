import { validate } from 'class-validator';
import { UpdateStockDto } from './update-stock.dto';

describe('UpdateStockDto validation', () => {
  it('accepts a valid stock value', async () => {
    const dto = new UpdateStockDto();
    dto.stock = 20;

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('rejects negative stock', async () => {
    const dto = new UpdateStockDto();
    dto.stock = -1;

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'stock')).toBe(true);
  });

  it('rejects non-integer stock', async () => {
    const dto = new UpdateStockDto();
    dto.stock = 2.5 as unknown as number;

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'stock')).toBe(true);
  });
});
