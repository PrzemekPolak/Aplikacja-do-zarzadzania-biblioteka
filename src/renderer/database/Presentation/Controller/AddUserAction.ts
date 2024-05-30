import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Users} from "../../Domain/Users";
import {AddUserRequest} from "../Request/AddUserRequest";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {User} from "../../Domain/User";

export class AddUserAction extends AbstractController implements Controller
{
  constructor(
    @inject(TYPES.Users) private readonly users: Users,
  ) {
    super();
  }

  invoke(request: any): any
  {
    const preparedRequest = AddUserRequest.fromData(request);

    return super.actionCompletionStatusForSaving(() => {
      this.users.add(User.create(
        this.users.generateIdentityForNewUser(),
        preparedRequest.userName,
        preparedRequest.surname,
        preparedRequest.phoneNumber,
        preparedRequest.address,
      ))
    });
  }
}
