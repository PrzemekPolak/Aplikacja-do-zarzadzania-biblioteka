import {BookIdentity} from "../../Domain/BookIdentity";

export class AddOrUpdateBookRequestBuilder
{
  private constructor(
    private request: any,
  ) {
  }

  public static default(): AddOrUpdateBookRequestBuilder
  {
    return new AddOrUpdateBookRequestBuilder({
      id: BookIdentity.generate().getValue(),
      title: 'title',
      author: 'test author',
      entryId: BookIdentity.generate().getValue(),
    });
  }

  public build(): any
  {
    return this.request;
  }

  public withIdentity(bookIdentity: BookIdentity): AddOrUpdateBookRequestBuilder
  {
    this.request.entryId = bookIdentity.getValue();
    this.request.id = bookIdentity.getValue();

    return new AddOrUpdateBookRequestBuilder(this.request);
  }

  public withTitle(title: string): AddOrUpdateBookRequestBuilder
  {
    this.request.title = title;

    return new AddOrUpdateBookRequestBuilder(this.request);
  }
}
