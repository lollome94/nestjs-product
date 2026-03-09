import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { PaginatedProductsDto } from '../../application/dto/paginated-products.dto';
import { ProductResponseDto } from '../../application/dto/product-response.dto';
import { UpdateStockDto } from '../../application/dto/update-stock.dto';
import { PRODUCT_SERVICE } from '../../application/services/product.service';
import type { IProductService } from '../../application/services/product.service';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() body: CreateProductDto): Promise<ProductResponseDto> {
    return this.productService.createProduct(body);
  }

  @Get()
  getProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginatedProductsDto> {
    return this.productService.getProducts(page, limit);
  }

  @Get(':id')
  getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDto> {
    return this.productService.getProductById(id);
  }

  @Put(':id/stock')
  updateProductStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStockDto,
  ): Promise<ProductResponseDto> {
    return this.productService.updateProductStock(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productService.deleteProduct(id);
  }
}
