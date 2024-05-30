export class PhoneNumber
{
  constructor(
    private value: string,
  ) {
  }

  public static fromString($value: string): PhoneNumber
  {
    return new PhoneNumber($value);
  }

  public toString(): string
  {
    return parseInt(this.value).toString();
  }
}
