import {User} from "./User";
import {UserIdentity} from "./UserIdentity";
import {Filter} from "../Filters/Filter";
import {Pagination} from "../Filters/Pagination";

export interface Users
{
  getUsersList(pagination: Pagination, filters: Array<Filter>): Array<User>;

  countUsers(pagination: Pagination, filters: Array<Filter>): number;

  find(identity: UserIdentity): User;

  generateIdentityForNewUser(): UserIdentity

  add(user: User): void;

  update(user: User): void;

  delete(identity: UserIdentity): void;
}
