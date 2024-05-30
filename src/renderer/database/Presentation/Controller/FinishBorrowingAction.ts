import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";

export class FinishBorrowingAction extends AbstractController implements Controller
{
  public constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
  ) {
    super();
  }

  public invoke(request: any): any
  {
    return super.actionCompletionStatusForSaving(() => {
      this.borrowings.finishBorrowing(BorrowingIdentity.fromString(request.entryId));
    });
  }
}
