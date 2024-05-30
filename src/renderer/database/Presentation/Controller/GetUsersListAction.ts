import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Users} from "../../Domain/Users";
import {GetUsersListRequest} from "../Request/GetUsersListRequest";
import {Controller} from "./Controller";
import {ListView} from "../View/ListView";
import {User} from "../../Domain/User";
import {UserView} from "../View/UserView";
import {Pagination} from "../../Filters/Pagination";

export class GetUsersListAction implements Controller
{
  constructor(
    @inject(TYPES.Users) private readonly users: Users,
  ) {
  }

  invoke(request: any): any
  {
    const usersListRequest = GetUsersListRequest.fromData(request);
    const filters = [usersListRequest.searchFieldsFilter, usersListRequest.orderByFilter];

    return ListView.create(
      this.users.getUsersList(Pagination.create(usersListRequest.page), filters)
        .map((user: User) => UserView.create(user)),
      this.users.countUsers(Pagination.create(usersListRequest.page), filters),
    );
  }
}
