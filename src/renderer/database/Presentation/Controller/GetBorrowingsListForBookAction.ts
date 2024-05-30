import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {Users} from "../../Domain/Users";
import {ListView} from "../View/ListView";
import {Borrowing} from "../../Domain/Borrowing";
import {IdInListFilter} from "../../Filters/IdInListFilter";
import {SearchFieldsFilter} from "../../Filters/SearchFieldsFilter";
import {Pagination} from "../../Filters/Pagination";
import {GetBorrowingsListForItemRequest} from "../Request/GetBorrowingsListForItemRequest";
import {BorrowingForBookView} from "../View/BorrowingForBookView";
import {BookIdentity} from "../../Domain/BookIdentity";
import {BorrowedBooksOnlyFilter} from "../../Filters/BorrowedBooksOnlyFilter";

export class GetBorrowingsListForBookAction extends AbstractController implements Controller
{
  constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
    @inject(TYPES.Users) private readonly users: Users,
  ) {
    super();
  }

  invoke(request: any): any
  {
    const preparedRequest = GetBorrowingsListForItemRequest.prepare(request);
    const filters = [
      IdInListFilter.forUsers(this.users.getUsersList(Pagination.all(), [SearchFieldsFilter.for(preparedRequest.search, ['id', 'userName', 'surname', 'phone', 'city', 'street', 'streetNumber'])])),
      IdInListFilter.forBook(BookIdentity.fromString(preparedRequest.entryId)),
      BorrowedBooksOnlyFilter.forBorrowings(preparedRequest.borrowedOnly),
      preparedRequest.orderByFilter,
    ];

    return ListView.create(
      this.borrowings.getBorrowingsList(Pagination.create(preparedRequest.page), filters).map((borrowing: Borrowing) => {
        return BorrowingForBookView.create(
          borrowing,
          this.users.find(borrowing.userId),
        );
      }),
      this.borrowings.countBorrowings(Pagination.create(preparedRequest.page), filters)
    );
  }
}
