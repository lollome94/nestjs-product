export class Stock {
  private constructor(private readonly value: number) {}

  static fromNumber(value: number): Stock {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error('Stock must be a non-negative integer');
    }

    return new Stock(value);
  }

  toNumber(): number {
    return this.value;
  }
}
