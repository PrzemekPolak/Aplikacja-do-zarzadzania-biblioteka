import {BorrowingIdentity} from "./BorrowingIdentity";
import {UserIdentity} from "./UserIdentity";
import {BookIdentity} from "./BookIdentity";
import {Rating} from "../Application/Enum/Rating";

export class Borrowing
{
  private constructor(
    public readonly identity: BorrowingIdentity,
    public readonly userId: UserIdentity,
    public readonly bookId: BookIdentity,
    public readonly borrowedDate: number,
    public readonly returnedDate: number | null,
    private rating: Rating | null,
  ) {
  }

  public static create(
    identity: BorrowingIdentity,
    userId: UserIdentity,
    bookId: BookIdentity,
    borrowedDate: number,
    returnedDate: number | null,
    rating: Rating | null,
  ): Borrowing
  {
    if (null === returnedDate && null !== rating) {
      throw new Error('User can not rate borrowing before finishing it');
    }

    return new Borrowing(
      identity,
      userId,
      bookId,
      borrowedDate,
      returnedDate,
      rating,
    );
  }

  public static fromArray(data: any): Borrowing
  {
    return new Borrowing(
      BorrowingIdentity.fromString(data.id),
      UserIdentity.fromString(data.userId),
      BookIdentity.fromString(data.bookId),
      data.borrowedDate,
      data.returnedDate,
      null !== data.rating ? Rating.fromInt(data.rating) : null,
    );
  }

  public rate(rating: Rating): void
  {
    this.rating = rating;
  }

  public removeRating(): void
  {
    this.rating = null;
  }

  public getRating(): Rating | null
  {
    return this.rating;
  }
}
