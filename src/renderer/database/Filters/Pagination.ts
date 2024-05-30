export class Pagination
{
  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {
  }

  public static create(page: number): Pagination
  {
    return new Pagination(page, 10);
  }

  public static all(): Pagination
  {
    return new Pagination(1, 999999);
  }
}
