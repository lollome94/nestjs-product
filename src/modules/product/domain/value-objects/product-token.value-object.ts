export class ProductToken {
  private constructor(private readonly value: string) {}

  static fromString(value: string): ProductToken {
    const normalized = value.trim();

    if (normalized.length === 0) {
      throw new Error('ProductToken must not be empty');
    }

    if (normalized.length > 255) {
      throw new Error('ProductToken length must be <= 255');
    }

    return new ProductToken(normalized);
  }

  toString(): string {
    return this.value;
  }
}
