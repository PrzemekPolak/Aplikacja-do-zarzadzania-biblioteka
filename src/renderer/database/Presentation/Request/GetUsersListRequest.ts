import {SearchFieldsFilter} from "../../Filters/SearchFieldsFilter";
import {OrderByFilter} from "../../Filters/OrderByFilter";

export class GetUsersListRequest
{
  private constructor(
    public readonly page: number,
    public readonly searchFieldsFilter: SearchFieldsFilter,
    public readonly orderByFilter: OrderByFilter,
  ) {
  }

  public static fromData(data: any): GetUsersListRequest
  {
    return new GetUsersListRequest(
      data['page'],
      SearchFieldsFilter.for(data['search'], ["id", "userName", "surname", "phone", "city", "street", "streetNumber"]),
      OrderByFilter.forUsers(data['orderBy'], data['sortDirection']),
    );
  }
}
