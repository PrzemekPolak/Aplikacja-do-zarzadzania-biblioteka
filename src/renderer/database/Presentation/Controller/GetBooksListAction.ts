import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Books} from "../../Domain/Books";
import {GetBooksListRequest} from "../Request/GetBooksListRequest";
import {Controller} from "./Controller";
import {ListView} from "../View/ListView";
import {Book} from "../../Domain/Book";
import {BookView} from "../View/BookView";
import {Pagination} from "../../Filters/Pagination";
import {Borrowings} from "../../Domain/Borrowings";

export class GetBooksListAction implements Controller
{
  constructor(
    @inject(TYPES.Books) private readonly books: Books,
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
  ) {
  }

  invoke(request: any): any
  {
    const preparedRequest = GetBooksListRequest.prepare(request);

    return ListView.create(
      this.books.getBooksList(Pagination.create(preparedRequest.page), preparedRequest.filters)
        .map((book: Book) => BookView.create(
          book,
          this.borrowings.bookRating(book.identity).value,
        )),
      this.books.countBooks(Pagination.create(preparedRequest.page), preparedRequest.filters),
    );
  }
}
