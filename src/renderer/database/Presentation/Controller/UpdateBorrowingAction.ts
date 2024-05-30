import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {UpdateBorrowingRequest} from "../Request/UpdateBorrowingRequest";

export class UpdateBorrowingAction extends AbstractController implements Controller
{
  public constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
  ) {
    super();
  }

  public invoke(request: any): any
  {
    return super.actionCompletionStatusForSaving(() => {
      this.borrowings.update(UpdateBorrowingRequest.prepare(request).borrowing);
    });
  }
}
