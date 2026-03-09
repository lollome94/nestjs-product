import { Price } from '../value-objects/price.value-object';
import { ProductId } from '../value-objects/product-id.value-object';
import { ProductToken } from '../value-objects/product-token.value-object';
import { Stock } from '../value-objects/stock.value-object';

type ProductProps = {
  id?: ProductId;
  productToken: ProductToken;
  name: string;
  price: Price;
  stock: Stock;
};

export class Product {
  private constructor(private readonly props: ProductProps) {}

  static create(props: ProductProps): Product {
    const normalizedName = props.name.trim();

    if (normalizedName.length === 0) {
      throw new Error('Product name must not be empty');
    }

    if (normalizedName.length > 255) {
      throw new Error('Product name length must be <= 255');
    }

    return new Product({
      ...props,
      name: normalizedName,
    });
  }

  get id(): ProductId | undefined {
    return this.props.id;
  }

  get productToken(): ProductToken {
    return this.props.productToken;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): Price {
    return this.props.price;
  }

  get stock(): Stock {
    return this.props.stock;
  }
}
