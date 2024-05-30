import {Filter} from "./Filter";
import {User} from "../Domain/User";
import {Book} from "../Domain/Book";
import {BookIdentity} from "../Domain/BookIdentity";
import {UserIdentity} from "../Domain/UserIdentity";

export class IdInListFilter implements Filter {
  constructor(
    private readonly arr: Array<number>,
    private readonly column: string,
    private readonly exclude: boolean = false,
  ) {
  }

  public static forUsers(users: User[]): IdInListFilter {
    return new IdInListFilter(users.map((user: User) => user.identity.getValue() ?? 0), 'userId');
  }

  public static forUser(userIdentity: UserIdentity): IdInListFilter
  {
    return new IdInListFilter([userIdentity.getValue()], 'userId');
  }

  public static forBooks(books: Book[]): IdInListFilter {
    return new IdInListFilter(books.map((book: Book) => book.identity.getValue()), 'bookId');
  }

  public static forBooksIds(books: BookIdentity[], exclude: boolean = false): IdInListFilter {
    return new IdInListFilter(books.map((bookIdentity: BookIdentity) => bookIdentity.getValue()), 'bookId', exclude);
  }

  public static forBook(bookIdentity: BookIdentity): IdInListFilter
  {
    return new IdInListFilter([bookIdentity.getValue()], 'bookId');
  }

  public getSql(): string
  {
    return `${this.column} ${this.exclude ? 'NOT IN' : 'IN'} (${this.arr})`;
  }
}
