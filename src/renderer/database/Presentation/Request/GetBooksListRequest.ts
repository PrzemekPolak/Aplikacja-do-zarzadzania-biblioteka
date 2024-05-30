import {OrderByFilter} from "../../Filters/OrderByFilter";
import {SearchFieldsFilter} from "../../Filters/SearchFieldsFilter";
import {Filter} from "../../Filters/Filter";
import {BorrowedBooksOnlyFilter} from "../../Filters/BorrowedBooksOnlyFilter";

export class GetBooksListRequest
{
  private constructor(
    public readonly page: number,
    public readonly filters: Filter[],
  ) {
  }

  public static prepare(data: any): GetBooksListRequest
  {
    return new GetBooksListRequest(
      data['page'],
      [
        SearchFieldsFilter.for(data['search'], ["id", "title", "author", "authorSurname"]),
        BorrowedBooksOnlyFilter.create(data['borrowedOnly']),
        OrderByFilter.forBooks(data['orderBy'], data['sortDirection']),
      ],
    );
  }
}
