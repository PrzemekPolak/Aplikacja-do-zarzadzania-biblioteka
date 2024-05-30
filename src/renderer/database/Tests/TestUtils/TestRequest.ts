import {QueryOption} from "../../queries.model";

export class TestRequest
{
  private constructor(
    public action: QueryOption,
    public payload: any,
  ) {
  }

  public static create(
    action: QueryOption,
    payload: any,
  ): TestRequest
  {
    return new TestRequest(
      action,
      payload,
    );
  }
}
