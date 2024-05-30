import {Filter} from "./Filter";

export class BasicFilter implements Filter
{
  private constructor(
    private readonly sql: string,
    private readonly condition: boolean,
  ) {
  }

  static create(sql: string, condition: boolean): BasicFilter
  {

    return new BasicFilter(
      sql,
      condition,
    );
  }

  getSql(): string
  {
    return this.condition ? this.sql : '';
  }
}
