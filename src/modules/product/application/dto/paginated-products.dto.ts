import { ProductResponseDto } from './product-response.dto';

export class PaginationMetaDto {
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}

export class PaginatedProductsDto {
  items!: ProductResponseDto[];
  meta!: PaginationMetaDto;
}
