import {OrderByFilter} from "../../Filters/OrderByFilter";

export class GetBorrowingsListRequest
{
  private constructor(
    public readonly search: string,
    public readonly page: number,
    public readonly borrowedOnly: boolean,
    public readonly orderByFilter: OrderByFilter,
  ) {
  }

  public static fromData(data: any): GetBorrowingsListRequest
  {
    return new GetBorrowingsListRequest(
      data['search'],
      data['page'],
      data['borrowedOnly'],
      OrderByFilter.forBorrowings(data['orderBy'], data['sortDirection']),
    );
  }
}
