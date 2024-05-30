import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Books} from "../../Domain/Books";
import {AddOrUpdateBookRequest} from "../Request/AddOrUpdateBookRequest";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {BookIdentity} from "../../Domain/BookIdentity";

export class UpdateBookAction extends AbstractController implements Controller
{
  constructor(
    @inject(TYPES.Books) private readonly books: Books,
  ) {
    super();
  }

  invoke(request: any): any
  {
    return super.actionCompletionStatusForSaving(() => {
      this.books.update(BookIdentity.fromString(request.entryId), AddOrUpdateBookRequest.fromData(request).book);
    });
  }
}
