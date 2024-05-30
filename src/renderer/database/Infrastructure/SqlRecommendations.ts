import {inject, injectable} from "inversify";
import {TYPES} from "./Resources/AvailableInterfaces";
import {DbHelpers} from "../Domain/DbHelpers";
import {UserIdentity} from "../Domain/UserIdentity";
import {Recommendations} from "../Domain/Recommendations";
import {BookIdentity} from "../Domain/BookIdentity";

@injectable()
export class SqlRecommendations implements Recommendations
{
  public constructor(
    @inject(TYPES.DbHelpers) private readonly db: DbHelpers,
  ) {
  }

  public blockedByUser(user: UserIdentity): BookIdentity[]
  {
    try {
      const result = this.db.getOne(`SELECT * FROM recommendation WHERE user_identity = ${user.getValue()}`);
      return JSON.parse(result['excluded']).map((item) => BookIdentity.fromString(item));
    } catch (e) {
     return [];
    }
  }

  public excludeForUser(user: UserIdentity, book: BookIdentity): void
  {
    try {
      const current = JSON.parse(this.db.getOne(`SELECT * FROM recommendation WHERE user_identity = ${user.getValue()}`)['excluded'])
      this.db.addEditDbEntry(`UPDATE recommendation SET excluded = ? WHERE user_identity = ?`, [
        JSON.stringify(this.addNewValueWithoutDuplicate(current, book)),
        user.getValue(),
      ]);
    } catch (e) {
      this.db.addEditDbEntry(`INSERT INTO recommendation (user_identity, excluded) VALUES (?,?)`, [
        user.getValue(),
        JSON.stringify([ book.getValue()]),
      ]);
    }
  }

  private addNewValueWithoutDuplicate(currentList: number[], book: BookIdentity): number[]
  {
    if (currentList.includes(book.getValue())) {
      return currentList;
    }
    return currentList.concat([book.getValue()]);
  }
}
