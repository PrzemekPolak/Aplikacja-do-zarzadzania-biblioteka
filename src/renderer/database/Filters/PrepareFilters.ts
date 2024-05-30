import {Filter} from "./Filter";
import {OrderByFilter} from "./OrderByFilter";

export class PrepareFilters
{
  private constructor(
    private filters: Filter[],
    private orderByFilter: Filter | null,
  ) {
  }

  static for(filters: Filter[]): PrepareFilters
  {
    return new PrepareFilters(
      filters.filter((filter: Filter) => !(filter instanceof OrderByFilter)),
      filters.filter((filter: Filter) => filter instanceof OrderByFilter)[0] ?? null,
    );
  }

  public getSql(): string
  {
    let sql = this.filters
      .filter((filter: Filter) => '' !== filter.getSql())
      .map((filter: Filter) => filter.getSql())
      .join(` AND `)

    sql = '' !== sql ? 'WHERE ' + sql + ' ' : '';

    return (sql ?? '') + (null !== this.orderByFilter ? this.orderByFilter.getSql() : '');
  }
}
