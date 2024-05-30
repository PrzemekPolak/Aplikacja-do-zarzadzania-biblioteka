import {Filter} from "./Filter";

export class SearchFieldsFilter implements Filter
{
  private constructor(
    private readonly searchText: string | null,
    private readonly fields: string[],
  ) {
  }

  static for(searchText: string | null, fields: string[]): SearchFieldsFilter
  {
    return new SearchFieldsFilter(
      searchText,
      fields,
    );
  }

  getSql(): string
  {
    return (this.fields && this.searchText) ? '(' + this.fields
      .map((field) => `${field} LIKE '%${this.searchText}%'`)
      .join(` OR `) + ')' : '';
  }
}
