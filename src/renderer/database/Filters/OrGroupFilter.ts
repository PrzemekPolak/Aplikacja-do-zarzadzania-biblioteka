import {Filter} from "./Filter";

export class OrGroupFilter implements Filter
{
  private constructor(
    private filters: Filter[],
  ) {
  }

  public static create(filters: Filter[]): OrGroupFilter
  {
    return new OrGroupFilter(filters);
  }

  public getSql(): string
  {
    let sql = this.filters
      .filter((filter: Filter) => '' !== filter.getSql())
      .map((filter: Filter) => filter.getSql())
      .join(` OR `)

    return '' !== sql ? '(' + sql + ')' : '';
  }
}
