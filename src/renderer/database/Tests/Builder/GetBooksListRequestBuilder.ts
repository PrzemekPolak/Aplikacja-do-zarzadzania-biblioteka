export class GetBooksListRequestBuilder
{
  private constructor(
    private request: any,
  ) {
  }

  public static default(): GetBooksListRequestBuilder
  {
    return new GetBooksListRequestBuilder({
      'search': null,
      'sortDirection': 'DESC',
      'orderBy': 'ID',
      'borrowedOnly': false,
      'page': 1
    });
  }

  public build(): any
  {
    return this.request;
  }

  public withSearchPhrase(search: string): GetBooksListRequestBuilder
  {
    this.request.search = search;

    return new GetBooksListRequestBuilder(this.request);
  }

  public borrowedOnly(): GetBooksListRequestBuilder
  {
    this.request.borrowedOnly = true;

    return new GetBooksListRequestBuilder(this.request);
  }

  public unBorrowedOnly(): GetBooksListRequestBuilder
  {
    this.request.borrowedOnly = false;

    return new GetBooksListRequestBuilder(this.request);
  }
}
