export class Price {
  private constructor(private readonly value: number) {}

  static fromNumber(value: number): Price {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error('Price must be a non-negative number');
    }

    const rounded = Number(value.toFixed(2));

    return new Price(rounded);
  }

  toNumber(): number {
    return this.value;
  }
}
