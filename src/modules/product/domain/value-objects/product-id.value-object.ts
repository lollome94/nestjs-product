export class ProductId {
  private constructor(private readonly value: number) {}

  static fromNumber(value: number): ProductId {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('ProductId must be a positive integer');
    }

    return new ProductId(value);
  }

  toNumber(): number {
    return this.value;
  }
}
