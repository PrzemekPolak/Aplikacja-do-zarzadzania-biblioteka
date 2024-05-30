import {Book} from "./Book";
import {BookIdentity} from "./BookIdentity";
import {Filter} from "../Filters/Filter";
import {Pagination} from "../Filters/Pagination";

export interface Books
{
  getBooksList(pagination: Pagination, filters: Array<Filter>): Array<Book>;

  countBooks(pagination: Pagination, filters: Array<Filter>): number;

  find(identity: BookIdentity): Book;

  add(book: Book): void;

  update(identity: BookIdentity, book: Book): void;

  delete(identity: BookIdentity): void;
}
