import {OrderByFilter} from "../../Filters/OrderByFilter";

export class GetBorrowingsListForItemRequest
{
  private constructor(
    public readonly entryId: string,
    public readonly search: string,
    public readonly page: number,
    public readonly borrowedOnly: boolean,
    public readonly orderByFilter: OrderByFilter,
  ) {
  }

  public static prepare(data: any): GetBorrowingsListForItemRequest
  {
    return new GetBorrowingsListForItemRequest(
      data['entryId'],
      data['search'],
      data['page'],
      data['borrowedOnly'],
      OrderByFilter.forBorrowings(data['orderBy'], data['sortDirection']),
    );
  }
}
