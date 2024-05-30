import {Filter} from "./Filter";
import {BasicFilter} from "./BasicFilter";

export class BorrowedBooksOnlyFilter implements Filter
{
  private constructor(
    private readonly filter: BasicFilter,
  ) {
  }

  static create(condition: boolean): BorrowedBooksOnlyFilter
  {
    return new BorrowedBooksOnlyFilter(
      BasicFilter.create(`isBorrowed IS NOT NULL`, condition)
    );
  }

  static forBorrowings(condition: boolean): BorrowedBooksOnlyFilter
  {
    return new BorrowedBooksOnlyFilter(
      BasicFilter.create(`returnedDate IS NULL`, condition)
    );
  }

  getSql(): string
  {
    return this.filter.getSql();
  }
}
