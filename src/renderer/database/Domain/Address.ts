export class Address
{
  private constructor(
    public readonly city: string | null,
    public readonly street: string | null,
    public readonly streetNumber: number | null,
  ) {
  }

  public static create(
    city: string | null,
    street: string | null,
    streetNumber: string | null,
  ): Address | null
  {
    if (null === city && null === street && null === streetNumber) {
      return null;
    }

    return new Address(
      city,
      street,
      streetNumber ? parseInt(streetNumber) : null,
    );
  }
}
