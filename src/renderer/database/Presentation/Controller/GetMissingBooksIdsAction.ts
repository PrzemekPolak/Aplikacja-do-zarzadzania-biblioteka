import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Books} from "../../Domain/Books";
import {Controller} from "./Controller";
import {Book} from "../../Domain/Book";
import {Pagination} from "../../Filters/Pagination";
import {OrderByFilter} from "../../Filters/OrderByFilter";

export class GetMissingBooksIdsAction implements Controller
{
  constructor(
    @inject(TYPES.Books) private readonly books: Books,
  ) {
  }

  invoke(): any
  {
    const findMissing = (books: Book[]) => {
      const arrOfIds: number[] = [];
      const missing: number[] = [];
      for (var book of books) arrOfIds.push(book.identity.getValue());
      for (var i = arrOfIds[0]; i <= arrOfIds[arrOfIds.length - 1]; i++) {
        if (!arrOfIds.includes(i)) missing.push(i);
      }
      const missingNumber = missing.length;
      return { missing, missingNumber };
    };

    const { missing, missingNumber } = findMissing(this.books.getBooksList(Pagination.all(), [OrderByFilter.forBooks('ID', 'ASC')]));

    return {
      listData: missing,
      missingNumber: missingNumber,
      state: {
        success: true,
        message: `Znaleziono ${missingNumber} brakujących identyfikatorów`,
      },
    }
 }
}
