import {Book} from "../../Domain/Book";

export class BookView
{
  public static create(book: Book, avgRating: number | null): any
  {
    return {
      id: book.identity.getValue(),
      title: book.title,
      author: book.author?.name,
      authorSurname: book.author?.surname,
      isBorrowed: book.isBorrowed,
      avgRating: avgRating ? Math.round(avgRating * 100) / 100 : null,
    }
  }
}
