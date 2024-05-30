import {inject, injectable} from "inversify";
import {TYPES} from "./Resources/AvailableInterfaces";
import {DbHelpers} from "../Domain/DbHelpers";
import {Users} from "../Domain/Users";
import {User} from "../Domain/User";
import {PrepareFilters} from "../Filters/PrepareFilters";
import {UserIdentity} from "../Domain/UserIdentity";
import {Filter} from "../Filters/Filter";
import {Pagination} from "../Filters/Pagination";

@injectable()
export class SqlUsers implements Users
{
  public constructor(
    @inject(TYPES.DbHelpers) private readonly db: DbHelpers,
  ) {
  }

  public getUsersList(pagination: Pagination, filters: Array<Filter>): Array<User>
  {
    return this.getUsers(pagination, filters)["listData"].map((user: Array<any>) => User.fromArray(user));
  }

  public countUsers(pagination: Pagination, filters: Array<Filter>): number
  {
    return this.getUsers(pagination, filters)['fullLength'];
  }

  public add(user: User): void
  {
    this.db.addEditDbEntry(
      'INSERT INTO user (id, userName, surname, phone, city, street, streetNumber) VALUES (?,?,?,?,?,?,?)',
      [
        user.identity.getValue(),
        user.userName,
        user.surname,
        user.phone?.toString(),
        user.address?.city,
        user.address?.street,
        user.address?.streetNumber,
      ],
    )
  }

  public update(user: User): void
  {
    this.db.addEditDbEntry(
      `UPDATE user SET id = ?, userName = ?, surname = ?, phone = ?, city = ?, street = ?, streetNumber = ? WHERE id = ${user.identity.getValue()}`,
      [
        user.identity.getValue(),
        user.userName,
        user.surname,
        user.phone?.toString(),
        user.address?.city,
        user.address?.street,
        user.address?.streetNumber,
      ],
    )
  }

  public delete(identity: UserIdentity): void
  {
    this.db.execute( `DELETE FROM user WHERE id = ${identity.getValue()}`);
  }

  public find(identity: UserIdentity): User
  {
    return User.fromArray(this.db.getOne(`select * from user WHERE id = ${identity.getValue()}`));
  }

  public generateIdentityForNewUser(): UserIdentity {
    return UserIdentity.fromValue(this.db.currentAutoIncrementFor('user') + 1);
  }

  private getUsers(pagination: Pagination, filters: Array<Filter>)
  {
    return this.db.getPaginatedListFromDb(
      `select * from user ${(PrepareFilters.for(filters).getSql())}`,
      pagination,
    );
  }
}
