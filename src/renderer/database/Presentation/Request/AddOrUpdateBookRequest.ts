import {Book} from "../../Domain/Book";
import {BookIdentity} from "../../Domain/BookIdentity";
import {Author} from "../../Domain/Author";

export class AddOrUpdateBookRequest
{
  private constructor(
    public readonly book: Book,
  ) {
  }

  public static fromData(data: any): AddOrUpdateBookRequest
  {
    return new AddOrUpdateBookRequest(
      Book.create(
        BookIdentity.fromString(data.id),
        data.title,
        data.author ? Author.fromString(data.author) : null,
        false,
      ),
    )
  }
}
