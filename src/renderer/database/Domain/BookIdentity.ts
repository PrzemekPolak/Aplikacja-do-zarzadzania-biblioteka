export class BookIdentity
{
  private constructor(
    private value: number,
  ) {
  }

  public static fromString($value: string): BookIdentity
  {
    return new BookIdentity(parseInt($value));
  }

  static fromValue($value: number): BookIdentity
  {
    return new BookIdentity($value);
  }

  public static generate(): BookIdentity
  {
    return new BookIdentity(Math.floor(Math.random() * 9999999999));
  }

  public getValue(): number
  {
    return this.value;
  }

  equals(bookIdentity: BookIdentity): boolean
  {
    return this.value === bookIdentity.getValue();
  }
}
