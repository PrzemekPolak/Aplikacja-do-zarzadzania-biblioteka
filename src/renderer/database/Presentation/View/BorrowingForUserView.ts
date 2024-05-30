import {Borrowing} from "../../Domain/Borrowing";
import {Book} from "../../Domain/Book";

export class BorrowingForUserView
{
  public static create(borrowing: Borrowing, book: Book): any
  {
    return {
      id: borrowing.identity.toString(),
      userId: borrowing.userId.getValue(),
      bookId: borrowing.bookId.getValue(),
      borrowedDate: borrowing.borrowedDate,
      returnedDate: borrowing.returnedDate,
      rating: borrowing.getRating()?.getValue(),
      title: book.title,
      author: book.author?.name,
    }
  }
}
