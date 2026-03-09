import { ProductController } from './product.controller';
import type { ProductServicePort } from '../../application/services/product.service';
import { ProductResponseDto } from '../../application/dto/product-response.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: jest.Mocked<ProductServicePort>;

  beforeEach(() => {
    service = {
      createProduct: jest.fn(),
      getProducts: jest.fn(),
      getProductById: jest.fn(),
      updateProductStock: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductServicePort>;

    controller = new ProductController(service);
  });

  it('delegates createProduct', async () => {
    const response: ProductResponseDto = {
      id: 1,
      productToken: 'tok-ctrl-1',
      name: 'Controller Product',
      price: 10,
      stock: 2,
    };
    service.createProduct.mockResolvedValue(response);

    const result = await controller.createProduct({
      name: 'Controller Product',
      productToken: 'tok-ctrl-1',
      price: 10,
      stock: 2,
    });

    expect(service.createProduct).toHaveBeenCalledWith({
      name: 'Controller Product',
      productToken: 'tok-ctrl-1',
      price: 10,
      stock: 2,
    });
    expect(result).toEqual(response);
  });

  it('delegates getProducts', async () => {
    service.getProducts.mockResolvedValue({
      items: [],
      meta: {
        total: 0,
        page: 2,
        limit: 20,
        totalPages: 1,
      },
    });

    const result = await controller.getProducts(2, 20);

    expect(service.getProducts).toHaveBeenCalledWith(2, 20);
    expect(result.meta.page).toBe(2);
  });

  it('delegates getProductById', async () => {
    const response: ProductResponseDto = {
      id: 42,
      productToken: 'tok-ctrl-2',
      name: 'Product 42',
      price: 100,
      stock: 10,
    };
    service.getProductById.mockResolvedValue(response);

    const result = await controller.getProductById(42);

    expect(service.getProductById).toHaveBeenCalledWith(42);
    expect(result).toEqual(response);
  });

  it('delegates updateProductStock', async () => {
    const response: ProductResponseDto = {
      id: 2,
      productToken: 'tok-ctrl-3',
      name: 'Stock Product',
      price: 20,
      stock: 99,
    };
    service.updateProductStock.mockResolvedValue(response);

    const result = await controller.updateProductStock(2, { stock: 99 });

    expect(service.updateProductStock).toHaveBeenCalledWith(2, { stock: 99 });
    expect(result.stock).toBe(99);
  });

  it('delegates deleteProduct', async () => {
    service.deleteProduct.mockResolvedValue(undefined);

    await controller.deleteProduct(5);

    expect(service.deleteProduct).toHaveBeenCalledWith(5);
  });
});
