import {Book} from "../../Domain/Book";
import {Author} from "../../Domain/Author";
import {BookIdentity} from "../../Domain/BookIdentity";

export class BookBuilder
{
  private constructor(
    private book: any,
  ) {
  }

  public static default(): BookBuilder
  {
    return new BookBuilder(
      {
        id: BookIdentity.generate().getValue(),
        title: 'test title',
        author: 'name',
        authorSurname: 'surname',
        isBorrowed: false,
      },
    )
  }

  public build(): Book
  {
    return Book.fromArray(this.book);
  }

  public withIdentity(bookIdentity: BookIdentity): BookBuilder
  {
    this.book.id = bookIdentity.getValue();

    return new BookBuilder(this.book);
  }

  public withTitle(title: string): BookBuilder
  {
    this.book.title = title;

    return new BookBuilder(this.book);
  }

  public withAuthor(author: Author): BookBuilder
  {
    this.book.author = author.name;
    this.book.authorSurname = author.surname;

    return new BookBuilder(this.book);
  }
}
