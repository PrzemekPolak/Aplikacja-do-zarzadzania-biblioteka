import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";
import {BorrowingView} from "../View/BorrowingView";
import {Users} from "../../Domain/Users";
import {Books} from "../../Domain/Books";

export class GetBorrowingAction extends AbstractController implements Controller
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
    const borrowing = this.borrowings.find(BorrowingIdentity.fromString(request.entryId));

    return BorrowingView.create(
        borrowing,
        this.books.find(borrowing.bookId),
        this.users.find(borrowing.userId),
    );
  }
}
