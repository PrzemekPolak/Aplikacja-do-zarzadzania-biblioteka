export class UserIdentity
{
  private constructor(
    private value: number,
  ) {
  }

  public static fromString($value: string): UserIdentity
  {
    return new UserIdentity(parseInt($value));
  }

  public static fromValue($value: number): UserIdentity
  {
    return new UserIdentity($value);
  }

  public static generate(): UserIdentity
  {
    return new UserIdentity(Math.floor(Math.random() * 9999999999));
  }

  public getValue(): number
  {
    return this.value;
  }

  public equals(userIdentity: UserIdentity): boolean
  {
    return this.value === userIdentity.getValue();
  }
}
