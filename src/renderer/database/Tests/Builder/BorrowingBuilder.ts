import {UserIdentity} from "../../Domain/UserIdentity";
import {Borrowing} from "../../Domain/Borrowing";
import {BookIdentity} from "../../Domain/BookIdentity";
import {Rating} from "../../Application/Enum/Rating";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";

export class BorrowingBuilder
{
  private constructor(
    private borrowing: any,
  ) {
  }

  public static default(): BorrowingBuilder
  {
    return new BorrowingBuilder(
      {
        id: require('crypto').randomUUID(),
        userId: 11,
        bookId: 22,
        borrowedDate: 7684564645,
        returnedDate: null,
        rating: null,
      },
    )
  }

  public build(): Borrowing
  {
    return Borrowing.fromArray(this.borrowing);
  }

  public withUserIdentity(identity: UserIdentity): BorrowingBuilder
  {
    this.borrowing.userId = identity.getValue();

    return new BorrowingBuilder(this.borrowing);
  }

  public withBookIdentity(identity: BookIdentity): BorrowingBuilder
  {
    this.borrowing.bookId = identity.getValue();

    return new BorrowingBuilder(this.borrowing);
  }

  public withRating(rating: Rating | null): BorrowingBuilder
  {
    this.borrowing.rating = null !== rating ? rating.getValue() : null;

    return new BorrowingBuilder(this.borrowing);
  }

  public withIdentity(borrowingIdentity: BorrowingIdentity): BorrowingBuilder
  {
    this.borrowing.id = borrowingIdentity.toString();

    return new BorrowingBuilder(this.borrowing);
  }
}
