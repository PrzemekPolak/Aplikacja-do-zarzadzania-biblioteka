import {Borrowing} from "../../Domain/Borrowing";
import {UserIdentity} from "../../Domain/UserIdentity";
import {BookIdentity} from "../../Domain/BookIdentity";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";
import {Rating} from "../../Application/Enum/Rating";

export class UpdateBorrowingRequest
{
  private constructor(
    public readonly borrowing: Borrowing,
  ) {
  }

  public static prepare(data: any): UpdateBorrowingRequest
  {
    return new UpdateBorrowingRequest(
      Borrowing.create(
        BorrowingIdentity.fromString(data.entryId),
        UserIdentity.fromString(data.userId),
        BookIdentity.fromString(data.bookId),
        data.borrowedDate,
        data.returnedDate,
        data.rating ? Rating.fromInt(data.rating) : null,
      ),
    )
  }
}
