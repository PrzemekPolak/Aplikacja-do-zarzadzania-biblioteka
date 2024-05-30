import {Book} from "../Domain/Book";
import {inject, injectable} from "inversify";
import {Books} from "../Domain/Books";
import {TYPES} from "./Resources/AvailableInterfaces";
import {DbHelpers} from "../Domain/DbHelpers";
import {PrepareFilters} from "../Filters/PrepareFilters";
import {BookIdentity} from "../Domain/BookIdentity";
import {Filter} from "../Filters/Filter";
import {Pagination} from "../Filters/Pagination";

@injectable()
export class SqlBooks implements Books
{
  constructor(
    @inject(TYPES.DbHelpers) private readonly db: DbHelpers,
  ) {
  }

  getBooksList(pagination: Pagination, filters: Array<Filter>): Array<Book>
  {
    return this.getBooks(pagination, filters)["listData"].map((book: Array<any>) => Book.fromArray(book));
  };

  countBooks(pagination: Pagination, filters: Array<Filter>): number
  {
    return this.getBooks(pagination, filters)['fullLength'];
  }

  find(identity: BookIdentity): Book
  {
    return Book.fromArray(this.db.getOne(`select * from book WHERE id = ${identity.getValue()}`));
  }

  add(book: Book): void
  {
    this.db.addEditDbEntry(
      'INSERT INTO book (id, title, author, authorSurname) VALUES (?,?,?,?)',
      [
        book.identity.getValue(),
        book.title,
        book.author ? book.author.name : null,
        book.author ? book.author.surname : null,
      ],
    )
  }

  public update(identity: BookIdentity, book: Book): void
  {
    this.db.addEditDbEntry(
      `UPDATE book SET id = ?, title = ?, author = ?, authorSurname = ? WHERE id = ${identity.getValue()}`,
      [
        book.identity.getValue(),
        book.title,
        book.author ? book.author.name : null,
        book.author ? book.author.surname : null,
      ],
    )
  }

  public delete(identity: BookIdentity): void
  {
    this.db.execute( `DELETE FROM book WHERE id = ${identity.getValue()}`);
  }

  private getBooks(pagination: Pagination, filters: Array<Filter>)
  {
    return this.db.getPaginatedListFromDb(
      `select *, (select bookId from borrowed WHERE book.id = borrowed.bookId AND borrowed.returnedDate IS NULL) AS isBorrowed from book ${(PrepareFilters.for(filters).getSql())}`,
      pagination
    );
  }
}
