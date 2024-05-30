import {injectable} from "inversify";
import {DbHelpers} from "../Domain/DbHelpers";
import {AbstractDbHelper} from "./AbstractDbHelper";

const sqlite3 = require("better-sqlite3");

@injectable()
export class DbHelper extends AbstractDbHelper implements DbHelpers
{
  private readonly database: any;

  constructor() {
    super();

    this.database = new sqlite3('resources/db.sqlite');
    this.database.pragma('foreign_keys = ON');
    this.database.pragma('journal_mode = WAL');
  }

  db() {
    return this.database;
  }
}
