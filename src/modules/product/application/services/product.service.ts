import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { PaginatedProductsDto } from '../dto/paginated-products.dto';
import { ProductResponseDto } from '../dto/product-response.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository as ProductRepository,
} from '../../infrastructure/persistence/repositories/sequelize-product.repository';
import { Product } from '../../domain/entities/product.entity';
import { Price } from '../../domain/value-objects/price.value-object';
import { ProductId } from '../../domain/value-objects/product-id.value-object';
import { ProductToken } from '../../domain/value-objects/product-token.value-object';
import { Stock } from '../../domain/value-objects/stock.value-object';

export const PRODUCT_SERVICE = 'PRODUCT_SERVICE';

export interface IProductService {
  createProduct(dto: CreateProductDto): Promise<ProductResponseDto>;
  getProducts(page?: number, limit?: number): Promise<PaginatedProductsDto>;
  getProductById(id: number): Promise<ProductResponseDto>;
  updateProductStock(
    id: number,
    dto: UpdateStockDto,
  ): Promise<ProductResponseDto>;
  deleteProduct(id: number): Promise<void>;
}

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<ProductResponseDto> {
    const productToken = ProductToken.fromString(dto.productToken);
    const existing =
      await this.productRepository.findByProductToken(productToken);

    if (existing) {
      throw new ConflictException('Product token already exists');
    }

    const product = Product.create({
      productToken,
      name: dto.name,
      price: Price.fromNumber(dto.price),
      stock: Stock.fromNumber(dto.stock),
    });

    const saved = await this.productRepository.save(product);

    return this.toResponse(saved);
  }

  async getProducts(page = 1, limit = 10): Promise<PaginatedProductsDto> {
    if (!Number.isInteger(page) || page < 1) {
      throw new BadRequestException('page must be a positive integer');
    }

    if (!Number.isInteger(limit) || limit < 1) {
      throw new BadRequestException('limit must be a positive integer');
    }

    const offset = (page - 1) * limit;
    const { items, total } = await this.productRepository.findPaginated(
      offset,
      limit,
    );

    return {
      items: items.map((product) => this.toResponse(product)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async getProductById(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findById(this.toProductId(id));

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.toResponse(product);
  }

  async updateProductStock(
    id: number,
    dto: UpdateStockDto,
  ): Promise<ProductResponseDto> {
    const existing = await this.productRepository.findById(
      this.toProductId(id),
    );

    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    const updated = Product.create({
      id: existing.id,
      productToken: existing.productToken,
      name: existing.name,
      price: existing.price,
      stock: Stock.fromNumber(dto.stock),
    });

    const saved = await this.productRepository.save(updated);

    return this.toResponse(saved);
  }

  async deleteProduct(id: number): Promise<void> {
    const deleted = await this.productRepository.deleteById(
      this.toProductId(id),
    );

    if (!deleted) {
      throw new NotFoundException('Product not found');
    }
  }

  private toResponse(product: Product): ProductResponseDto {
    return {
      id: product.id?.toNumber() ?? 0,
      productToken: product.productToken.toString(),
      name: product.name,
      price: product.price.toNumber(),
      stock: product.stock.toNumber(),
    };
  }

  private toProductId(id: number): ProductId {
    try {
      return ProductId.fromNumber(id);
    } catch {
      throw new BadRequestException('id must be a positive integer');
    }
  }
}
