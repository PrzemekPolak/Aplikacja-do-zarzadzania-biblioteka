import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {ListView} from "../View/ListView";
import {Borrowing} from "../../Domain/Borrowing";
import {IdInListFilter} from "../../Filters/IdInListFilter";
import {SearchFieldsFilter} from "../../Filters/SearchFieldsFilter";
import {Pagination} from "../../Filters/Pagination";
import {GetBorrowingsListForItemRequest} from "../Request/GetBorrowingsListForItemRequest";
import {UserIdentity} from "../../Domain/UserIdentity";
import {Books} from "../../Domain/Books";
import {BorrowingForUserView} from "../View/BorrowingForUserView";
import {BorrowedBooksOnlyFilter} from "../../Filters/BorrowedBooksOnlyFilter";

export class GetBorrowingsListForUserAction extends AbstractController implements Controller
{
  constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
    @inject(TYPES.Books) private readonly books: Books,
  ) {
    super();
  }

  invoke(request: any): any
  {
    const preparedRequest = GetBorrowingsListForItemRequest.prepare(request);
    const filters = [
      IdInListFilter.forUser(UserIdentity.fromString(preparedRequest.entryId)),
      IdInListFilter.forBooks(this.books.getBooksList(Pagination.all(), [SearchFieldsFilter.for(preparedRequest.search, ["id", "title", "author"])])),
      BorrowedBooksOnlyFilter.forBorrowings(preparedRequest.borrowedOnly),
      preparedRequest.orderByFilter,
    ];

    return ListView.create(
      this.borrowings.getBorrowingsList(Pagination.create(preparedRequest.page), filters).map((borrowing: Borrowing) => {
        return BorrowingForUserView.create(
          borrowing,
          this.books.find(borrowing.bookId),
        );
      }),
      this.borrowings.countBorrowings(Pagination.create(preparedRequest.page), filters)
    );
  }
}
