import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";
import {BookIdentity} from "../../Domain/BookIdentity";

export class AddOrUpdateBorrowingRequestBuilder
{
  private constructor(
    private request: any,
  ) {
  }

  public static default(): AddOrUpdateBorrowingRequestBuilder
  {
    return new AddOrUpdateBorrowingRequestBuilder({
      entryId: BorrowingIdentity.generate().toString(),
      userId: 12,
      bookId: 42,
      borrowedDate: 7656453423,
      returnedDate: null,
    });
  }

  public build(): any
  {
    return this.request;
  }

  public withIdentity(borrowingIdentity: BorrowingIdentity): AddOrUpdateBorrowingRequestBuilder
  {
    this.request.entryId = borrowingIdentity.toString();

    return new AddOrUpdateBorrowingRequestBuilder(this.request);
  }

  public withBookIdentity(bookIdentity: BookIdentity): AddOrUpdateBorrowingRequestBuilder
  {
    this.request.bookId = bookIdentity.getValue();

    return new AddOrUpdateBorrowingRequestBuilder(this.request);
  }
}
