export class BorrowingIdentity
{
  private constructor(
    private value: string,
  ) {
  }

  public static fromString($value: string): BorrowingIdentity
  {
    return new BorrowingIdentity($value);
  }

  public static generate(): BorrowingIdentity
  {
    return new BorrowingIdentity(require('crypto').randomUUID());
  }

  public toString(): string
  {
    return this.value;
  }
}
