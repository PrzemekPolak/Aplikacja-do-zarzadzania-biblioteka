import {Filter} from "./Filter";

export class OrderByFilter implements Filter
{
  private constructor(
    private readonly column: string,
    private readonly direction: string,
  ) {
  }

  public static forBooks(orderBy: string | null, sortingDirection: string | null): OrderByFilter
  {
    let sql = '';

    if (orderBy === "ID") sql = `id`;
    if (orderBy === "TITLE") sql = `title`;
    if (orderBy === "USER_SURNAME") sql = `surname`;

    if ('' === sql) return new OrderByFilter('', '');

    return new OrderByFilter(
      sql,
      sortingDirection ?? 'DESC',
    );
  }

  public static forUsers(orderBy: string | null, sortingDirection: string | null): OrderByFilter
  {
    let sql = '';

    if (orderBy === "ID") sql = `id`;
    if (orderBy === "USER_SURNAME") sql = `surname`;

    if ('' === sql) return new OrderByFilter('', '');

    return new OrderByFilter(
      sql,
      sortingDirection ?? 'DESC',
    );
  }

  public static forBorrowings(orderBy: string | null, sortingDirection: string | null): OrderByFilter
  {
    let sql = '';

    if (orderBy === "ID") sql = `id`;
    if (orderBy === "BORROWED_DATE") sql = `borrowedDate`;
    if (orderBy === "RETURNED_DATE") sql = `returnedDate`;

    if ('' === sql) return new OrderByFilter('', '');

    return new OrderByFilter(
      sql,
      sortingDirection ?? 'DESC',
    );
  }

  public getSql(): string
  {
    if ('' === this.column) return '';

    return 'ORDER BY ' + this.column + ' ' + this.direction;
  }
}
