import {Borrowing} from "../../Domain/Borrowing";
import {User} from "../../Domain/User";

export class BorrowingForBookView
{
  public static create(borrowing: Borrowing, user: User): any
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
    }
  }
}
