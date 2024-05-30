import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";
import {Rating} from "../../Application/Enum/Rating";
import {TestRequest} from "../TestUtils/TestRequest";
import {DbTable} from "../../db.model";
import {QueryOption} from "../../queries.model";
import {BookIdentity} from "../../Domain/BookIdentity";

export class ExampleRequest
{
  public static rateBorrowing(borrowingIdentity: BorrowingIdentity, rating: Rating | null): TestRequest
  {
    return TestRequest.create(
      QueryOption.RateBorrowing,
      {
        entryId: borrowingIdentity.toString(),
        rating: null !== rating ? rating.getValue() : null,
      }
    );
  }

  public static addBorrowing(payload: any): TestRequest
  {
    return TestRequest.create(QueryOption.AddBorrowed, payload);
  }

  public static updateBorrowing(payload: any): TestRequest
  {
    return TestRequest.create(QueryOption.EditBorrowed, payload);
  }

  public static deleteRecord(entryId: string | number, dbTable: DbTable): TestRequest
  {
    return TestRequest.create(
      QueryOption.DeleteRecord,
      {
        entryId: entryId,
        dbTable: dbTable.toString(),
      }
    );
  }

  public static addBook(payload: any): TestRequest
  {
    return TestRequest.create(QueryOption.AddBook, payload);
  }

  public static updateBook(payload: any): TestRequest
  {
    return TestRequest.create(QueryOption.EditBook, payload);
  }

  public static getBooksList(payload: any): TestRequest
  {
    return TestRequest.create(QueryOption.GetBooksList, payload);
  }

  public static getBook(bookIdentity: BookIdentity): TestRequest
  {
    return TestRequest.create(QueryOption.GetBookData, {entryId: bookIdentity.getValue()});
  }
}
