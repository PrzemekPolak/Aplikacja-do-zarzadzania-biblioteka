import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {BorrowingView} from "../View/BorrowingView";
import {Users} from "../../Domain/Users";
import {Books} from "../../Domain/Books";
import {ListView} from "../View/ListView";
import {Borrowing} from "../../Domain/Borrowing";
import {GetBorrowingsListRequest} from "../Request/GetBorrowingsListRequest";
import {IdInListFilter} from "../../Filters/IdInListFilter";
import {SearchFieldsFilter} from "../../Filters/SearchFieldsFilter";
import {Pagination} from "../../Filters/Pagination";
import {BorrowedBooksOnlyFilter} from "../../Filters/BorrowedBooksOnlyFilter";
import {Filter} from "../../Filters/Filter";
import {OrGroupFilter} from "../../Filters/OrGroupFilter";

export class GetBorrowingsListAction extends AbstractController implements Controller
{
  constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
    @inject(TYPES.Books) private readonly books: Books,
    @inject(TYPES.Users) private readonly users: Users,
  ) {
    super();
  }

  invoke(request: any): any
  {
    const borrowingsListRequest = GetBorrowingsListRequest.fromData(request);
    let filters: Filter[] = [
      BorrowedBooksOnlyFilter.forBorrowings(borrowingsListRequest.borrowedOnly),
      borrowingsListRequest.orderByFilter,
    ];

    if (null !== borrowingsListRequest.search) {
      filters = filters.concat(OrGroupFilter.create([
        IdInListFilter.forUsers(this.users.getUsersList(Pagination.all(), [SearchFieldsFilter.for(borrowingsListRequest.search, ['id', 'userName', 'surname'])])),
        IdInListFilter.forBooks(this.books.getBooksList(Pagination.all(), [SearchFieldsFilter.for(borrowingsListRequest.search, ["id", "title", "author"])])),
      ]));
    }

    return ListView.create(
      this.borrowings.getBorrowingsList(Pagination.create(borrowingsListRequest.page), filters).map((borrowing: Borrowing) => {
        return BorrowingView.create(
          borrowing,
          this.books.find(borrowing.bookId),
          this.users.find(borrowing.userId),
        );
      }),
      this.borrowings.countBorrowings(Pagination.create(borrowingsListRequest.page), filters)
    );
  }
}
