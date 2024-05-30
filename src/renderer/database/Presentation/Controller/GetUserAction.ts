import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Users} from "../../Domain/Users";
import {Controller} from "./Controller";
import {UserView} from "../View/UserView";
import {UserIdentity} from "../../Domain/UserIdentity";

export class GetUserAction implements Controller
{
  constructor(
    @inject(TYPES.Users) private readonly users: Users,
  ) {
  }

  invoke(request: any): any
  {
    return UserView.create(this.users.find(UserIdentity.fromString(request.entryId)));
  }
}
