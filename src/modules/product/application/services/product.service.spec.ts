import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import type { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { Price } from '../../domain/value-objects/price.value-object';
import { ProductId } from '../../domain/value-objects/product-id.value-object';
import { ProductToken } from '../../domain/value-objects/product-token.value-object';
import { Stock } from '../../domain/value-objects/stock.value-object';

describe('ProductService', () => {
  let repository: jest.Mocked<ProductRepository>;
  let service: ProductService;

  const makeProduct = (overrides?: {
    id?: number;
    token?: string;
    name?: string;
    price?: number;
    stock?: number;
  }): Product => {
    const id = overrides?.id;

    return Product.create({
      id: id ? ProductId.fromNumber(id) : undefined,
      productToken: ProductToken.fromString(overrides?.token ?? 'tok-1'),
      name: overrides?.name ?? 'Demo',
      price: Price.fromNumber(overrides?.price ?? 10.5),
      stock: Stock.fromNumber(overrides?.stock ?? 3),
    });
  };

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByProductToken: jest.fn(),
      findAll: jest.fn(),
      findPaginated: jest.fn(),
      deleteById: jest.fn(),
    };

    service = new ProductService(repository);
  });

  it('creates a product when token is unique', async () => {
    repository.findByProductToken.mockResolvedValue(null);
    repository.save.mockResolvedValue(makeProduct({ id: 1, token: 'tok-x' }));

    const result = await service.createProduct({
      name: 'Product X',
      productToken: 'tok-x',
      price: 99.99,
      stock: 10,
    });

    expect(repository.findByProductToken).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: 1,
      productToken: 'tok-x',
      name: 'Demo',
      price: 10.5,
      stock: 3,
    });
  });

  it('rejects duplicate product token', async () => {
    repository.findByProductToken.mockResolvedValue(makeProduct({ id: 10 }));

    await expect(
      service.createProduct({
        name: 'Duplicate',
        productToken: 'tok-dup',
        price: 9.99,
        stock: 1,
      }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(repository.save).not.toHaveBeenCalled();
  });

  it('returns paginated products', async () => {
    repository.findPaginated.mockResolvedValue({
      items: [makeProduct({ id: 1 }), makeProduct({ id: 2, token: 'tok-2' })],
      total: 2,
    });

    const result = await service.getProducts(1, 10);

    expect(result.meta).toEqual({
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
    expect(result.items).toHaveLength(2);
  });

  it('fails when pagination is invalid', async () => {
    await expect(service.getProducts(0, 10)).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(service.getProducts(1, 0)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('finds a product by id', async () => {
    repository.findById.mockResolvedValue(makeProduct({ id: 123, token: 'tok-id' }));

    const result = await service.getProductById(123);

    expect(result.id).toBe(123);
    expect(result.productToken).toBe('tok-id');
  });

  it('throws not found when product does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.getProductById(123)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates stock', async () => {
    repository.findById.mockResolvedValue(makeProduct({ id: 7, stock: 5 }));
    repository.save.mockResolvedValue(makeProduct({ id: 7, stock: 25 }));

    const result = await service.updateProductStock(7, { stock: 25 });

    expect(result.stock).toBe(25);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('deletes an existing product', async () => {
    repository.deleteById.mockResolvedValue(true);

    await expect(service.deleteProduct(1)).resolves.toBeUndefined();
  });

  it('fails deleting a non existing product', async () => {
    repository.deleteById.mockResolvedValue(false);

    await expect(service.deleteProduct(100)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
