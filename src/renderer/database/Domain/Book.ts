import {BookIdentity} from "./BookIdentity";
import {Author} from "./Author";

export class Book
{
  private constructor(
    public readonly identity: BookIdentity,
    public readonly title: string,
    public readonly author: Author | null,
    public readonly isBorrowed: boolean,
  ) {
  }

  public static create(
    id: BookIdentity,
    title: string,
    author: Author | null,
    isBorrowed: boolean,
  ): Book {
    return new Book(
      id,
      title,
      author,
      isBorrowed,
    );
  }

  public static fromArray(
    dbArray: Array<any>,
  ): Book
  {
    return new Book(
      BookIdentity.fromString(dbArray['id']),
      dbArray['title'],
      Author.fromValues(
        dbArray['author'],
        dbArray['authorSurname'],
      ),
      dbArray['isBorrowed'],
    )
  }
}
