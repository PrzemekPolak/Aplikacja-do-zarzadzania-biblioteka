import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Borrowings} from "../../Domain/Borrowings";
import {Rating} from "../../Application/Enum/Rating";

export class RateBorrowingAction extends AbstractController implements Controller
{
  public constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
  ) {
    super();
  }

  public invoke(request: any): any
  {
    return super.actionCompletionStatusForSaving(() => {
      const borrowing = this.borrowings.find(request.entryId);
      if (null === request.rating) {
        borrowing.removeRating();
      } else {
        borrowing.rate(Rating.fromInt(request.rating));
      }
      this.borrowings.update(borrowing);
    });
  }
}
