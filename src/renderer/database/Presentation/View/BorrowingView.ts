import {Borrowing} from "../../Domain/Borrowing";
import {Book} from "../../Domain/Book";
import {User} from "../../Domain/User";

export class BorrowingView
{
  public static create(borrowing: Borrowing, book: Book, user: User): any
  {
    return {
      id: borrowing.identity.toString(),
      userId: borrowing.userId.getValue(),
      bookId: borrowing.bookId.getValue(),
      borrowedDate: borrowing.borrowedDate,
      returnedDate: borrowing.returnedDate,
      rating: borrowing.getRating()?.getValue(),
      userName: user.userName,
      surname: user.surname,
      phone: user.phone?.toString(),
      city: user.address?.city,
      street: user.address?.street,
      streetNumber: user.address?.streetNumber,
      title: book.title,
      author: book.author?.name,
    }
  }
}
