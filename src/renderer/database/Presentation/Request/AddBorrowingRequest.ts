import {Borrowing} from "../../Domain/Borrowing";
import {UserIdentity} from "../../Domain/UserIdentity";
import {BookIdentity} from "../../Domain/BookIdentity";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";

export class AddBorrowingRequest
{
  private constructor(
    public readonly borrowing: Borrowing,
  ) {
  }

  public static fromData(data: any): AddBorrowingRequest
  {
    return new AddBorrowingRequest(
      Borrowing.create(
        BorrowingIdentity.generate(),
        UserIdentity.fromValue(data.userId),
        BookIdentity.fromValue(data.bookId),
        data.borrowedDate,
        data.returnedDate,
        null,
      ),
    )
  }
}
