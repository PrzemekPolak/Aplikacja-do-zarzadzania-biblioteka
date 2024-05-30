import {Borrowing} from "./Borrowing";
import {BorrowingIdentity} from "./BorrowingIdentity";
import {Filter} from "../Filters/Filter";
import {Pagination} from "../Filters/Pagination";
import {BookIdentity} from "./BookIdentity";
import {AverageRating} from "./AverageRating";

export interface Borrowings
{
  getBorrowingsList(pagination: Pagination, filters: Array<Filter>): Borrowing[];

  countBorrowings(pagination: Pagination, filters: Array<Filter>): number;

  find(identity: BorrowingIdentity): Borrowing;

  add(borrowing: Borrowing): void;

  update(borrowing: Borrowing): void;

  delete(identity: BorrowingIdentity): void;

  finishBorrowing(identity: BorrowingIdentity): void;

  bookRating(bookIdentity: BookIdentity): AverageRating;

  booksRatings(filters: Filter[]): AverageRating[];
}
