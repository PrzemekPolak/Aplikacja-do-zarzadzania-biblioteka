import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Users} from "../../Domain/Users";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {UpdateUserRequest} from "../Request/UpdateUserRequest";

export class UpdateUserAction extends AbstractController implements Controller
{
  constructor(
    @inject(TYPES.Users) private readonly users: Users,
  ) {
    super();
  }

  invoke(request: any): any
  {
    return super.actionCompletionStatusForSaving(() => {
      this.users.update(UpdateUserRequest.prepare(request).user);
    });
  }
}
