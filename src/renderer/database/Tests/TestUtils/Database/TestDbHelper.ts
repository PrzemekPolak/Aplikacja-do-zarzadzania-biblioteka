import {DbHelpers} from "../../../Domain/DbHelpers";
import {injectable} from "inversify";
import {Database} from "better-sqlite3";
import {AbstractDbHelper} from "../../../Infrastructure/AbstractDbHelper";

const dbSqlite = require('better-sqlite3')

@injectable()
export class TestDbHelper extends AbstractDbHelper implements DbHelpers
{
  private readonly database: Database;

  constructor() {
    super();

    this.database = new dbSqlite('./src/renderer/database/Tests/TestUtils/Database/testDb.sqlite');
    this.database.pragma('foreign_keys = ON');
    this.database.pragma('journal_mode = WAL');
  }

  public db(): Database {
    return this.database;
  }

  public clearTable(tableName: string): void
  {
    this.db().prepare('DELETE FROM ' + tableName).run();
  }

  public clearAutoIncrement(tableName: string): void
  {
    this.db().prepare(`UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='${tableName}'`).run();
  }
}
