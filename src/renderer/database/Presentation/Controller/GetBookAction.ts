import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {BookView} from "../View/BookView";
import {Books} from "../../Domain/Books";
import {BookIdentity} from "../../Domain/BookIdentity";
import {Borrowings} from "../../Domain/Borrowings";

export class GetBookAction implements Controller
{
  constructor(
    @inject(TYPES.Books) private readonly books: Books,
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
  ) {
  }

  invoke(request: any): any
  {
    return BookView.create(
      this.books.find(BookIdentity.fromString(request.entryId)),
      this.borrowings.bookRating(BookIdentity.fromString(request.entryId)).value,
    );
  }
}
