import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {AddBorrowingRequest} from "../Request/AddBorrowingRequest";

export class AddBorrowingAction extends AbstractController implements Controller
{
  constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
  ) {
    super();
  }

  invoke(request: any): any
  {
    return super.actionCompletionStatusForSaving(() => {
      this.borrowings.add(AddBorrowingRequest.fromData(request).borrowing);
    });
  }
}
