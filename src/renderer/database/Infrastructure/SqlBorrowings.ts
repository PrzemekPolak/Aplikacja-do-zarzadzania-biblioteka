import {Borrowings} from "../Domain/Borrowings";
import {inject, injectable} from "inversify";
import {TYPES} from "./Resources/AvailableInterfaces";
import {DbHelpers} from "../Domain/DbHelpers";
import {Borrowing} from "../Domain/Borrowing";
import {BorrowingIdentity} from "../Domain/BorrowingIdentity";
import {PrepareFilters} from "../Filters/PrepareFilters";
import {Filter} from "../Filters/Filter";
import {Pagination} from "../Filters/Pagination";
import {BookIdentity} from "../Domain/BookIdentity";
import {AverageRating} from "../Domain/AverageRating";
import {BasicFilter} from "../Filters/BasicFilter";

@injectable()
export class SqlBorrowings implements Borrowings
{
  constructor(
    @inject(TYPES.DbHelpers) private readonly db: DbHelpers,
  ) {
  }

  public getBorrowingsList(pagination: Pagination, filters: Array<Filter>): Borrowing[]
  {
    return this.getBorrowings(pagination, filters)["listData"].map((borrowing: Array<any>) => Borrowing.fromArray(borrowing));
  }

  public countBorrowings(pagination: Pagination, filters: Array<Filter>): number
  {
    return this.getBorrowings(pagination, filters)['fullLength'];
  }

  public add(borrowing: Borrowing): void
  {
    this.db.addEditDbEntry(
      'INSERT INTO borrowed (id, userId, bookId, borrowedDate, returnedDate, rating) VALUES (?,?,?,?,?,?)',
      [
        borrowing.identity.toString(),
        borrowing.userId.getValue(),
        borrowing.bookId.getValue(),
        borrowing.borrowedDate,
        borrowing.returnedDate,
        borrowing.getRating()?.getValue(),
      ],
    )
  }

  public update(borrowing: Borrowing): void
  {
    this.db.addEditDbEntry(
      `UPDATE borrowed SET id = ?, userId = ?, bookId = ?, borrowedDate = ?, returnedDate = ?, rating = ? WHERE id LIKE '%${borrowing.identity.toString()}%'`,
      [
        borrowing.identity.toString(),
        borrowing.userId.getValue(),
        borrowing.bookId.getValue(),
        borrowing.borrowedDate,
        borrowing.returnedDate,
        borrowing.getRating()?.getValue(),
      ]
    );
  }

  public delete(identity: BorrowingIdentity): void
  {
    this.db.execute( `DELETE FROM borrowed WHERE id LIKE '%${identity.toString()}%'`);
  }

  public finishBorrowing(identity: BorrowingIdentity): void
  {
    this.db.addEditDbEntry(
      `UPDATE borrowed SET returnedDate = ? WHERE id LIKE '%${identity.toString()}%'`,
      [
        new Date().getTime(),
      ]
    );
  }

  public find(identity: BorrowingIdentity): Borrowing
  {
    return Borrowing.fromArray(this.db.getOne(`SELECT * FROM borrowed WHERE id LIKE '%${identity.toString()}%'`));
  }

  private getBorrowings(pagination: Pagination, filters: Array<Filter>): any
  {
    return this.db.getPaginatedListFromDb(
      `select * from borrowed ${(PrepareFilters.for(filters).getSql())}`,
      pagination,
    );
  }

  public bookRating(bookIdentity: BookIdentity): AverageRating
  {
    return new AverageRating(
      bookIdentity,
      this.db.getOne(`SELECT AVG(rating) as avgRating
                                FROM borrowed
                                WHERE bookId = ${bookIdentity.getValue()}`).avgRating
    );
  }

  public booksRatings(filters: Filter[]): AverageRating[]
  {
    const result = this.db.getPaginatedListFromDb(`SELECT bookId, AVG(rating) as avgRating FROM borrowed ${PrepareFilters.for(filters.concat([BasicFilter.create('rating IS NOT NULL', true)])).getSql()} GROUP BY bookId ORDER BY avgRating DESC`, Pagination.create(1));

    return result['listData'].map((item) => new AverageRating(BookIdentity.fromValue(item.bookId), item.avgRating));
  }
}
