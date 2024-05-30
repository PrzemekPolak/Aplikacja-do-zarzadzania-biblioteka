import {Pagination} from "../Filters/Pagination";
import {Database} from "better-sqlite3";
import {injectable} from "inversify";
import {NotFoundException} from "../Exception/NotFoundException";

@injectable()
export abstract class AbstractDbHelper
{
  public abstract db(): Database

  public getPaginatedListFromDb(sql, pagination: Pagination): any {
    const stmt = this.db().prepare(sql).all();

    return {
      listData: stmt?.slice(
        (pagination.page - 1) * pagination.limit,
        (pagination.page - 1) * pagination.limit + pagination.limit
      ),
      fullLength: stmt?.length,
    }
  };

  public getOne(sql: string): any
  {
    const result = this.db().prepare(sql).get();

    if (undefined === result) {
      throw new NotFoundException();
    }

    return result;
  }

  public addEditDbEntry(sql: string, insertData: Array<any>): void {
    this.db().prepare(sql).run(insertData);
  };

  public execute(sql: string): void
  {
    this.db().prepare(sql).run();
  }

  public currentAutoIncrementFor(table: string): number
  {
    try {
      return this.db().prepare(`SELECT seq FROM sqlite_sequence WHERE NAME='${table}'`).get()?.['seq'];
    } catch (e) {
      return 0;
    }
  }
}
