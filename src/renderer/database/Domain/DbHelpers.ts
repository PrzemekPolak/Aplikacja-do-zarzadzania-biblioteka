import {Pagination} from "../Filters/Pagination";

export interface DbHelpers
{
  getPaginatedListFromDb(sql: string, pagination: Pagination): any;

  getOne(sql: string): any

  addEditDbEntry(sql: string, insertData: Array<any>): void

  execute(sql: string): void

  currentAutoIncrementFor(table: string): number;
}
