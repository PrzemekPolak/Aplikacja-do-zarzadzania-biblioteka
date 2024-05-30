import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {Users} from "../../Domain/Users";
import {BookIdentity} from "../../Domain/BookIdentity";
import {Books} from "../../Domain/Books";
import {UserIdentity} from "../../Domain/UserIdentity";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";
import {Pagination} from "../../Filters/Pagination";
import {IdInListFilter} from "../../Filters/IdInListFilter";
import {Borrowing} from "../../Domain/Borrowing";
import {DbTable} from "../../db.model";

export class DeleteRecordAction extends AbstractController implements Controller
{
  constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
    @inject(TYPES.Users) private readonly users: Users,
    @inject(TYPES.Books) private readonly books: Books,
  ) {
    super();
  }

  invoke(request: any): any
  {
    return this.actionCompletionStatusForSaving(() => {
      switch(request.dbTable) {
        case DbTable.Book.toString():
          this.books.delete(BookIdentity.fromString(request.entryId));
          this.borrowings.getBorrowingsList(Pagination.all(), [IdInListFilter.forBook(BookIdentity.fromString(request.entryId))])
            .forEach((borrowing: Borrowing) => this.borrowings.delete(borrowing.identity))
          return;
        case DbTable.User.toString():
          this.users.delete(UserIdentity.fromString(request.entryId));
          this.borrowings.getBorrowingsList(Pagination.all(), [IdInListFilter.forUser(UserIdentity.fromString(request.entryId))])
            .forEach((borrowing: Borrowing) => this.borrowings.delete(borrowing.identity))
          return;
        case DbTable.Borrowed.toString():
          return this.borrowings.delete(BorrowingIdentity.fromString(request.entryId));
        default:
          throw Error(`Can not remove record from ${request.dbTable} because this table doesn't exist`);
      }
    });
  }
}
