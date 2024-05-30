export class Rating
{
  public static One = new Rating(1);
  public static Two = new Rating(2);
  public static Three = new Rating(3);
  public static Four = new Rating(4);
  public static Five = new Rating(5);

  private static allowedValues: number[] = [1, 2, 3, 4, 5];

  private constructor(
    private readonly value: number,
  ) {
  }

  public static fromInt(value: number): Rating
  {
    if (Rating.allowedValues.includes(value)) {
      return new Rating(value);
    }

    throw new Error(`Invalid Rating value: ${value}`);
  }

  public getValue(): number
  {
    return this.value;
  }
}
