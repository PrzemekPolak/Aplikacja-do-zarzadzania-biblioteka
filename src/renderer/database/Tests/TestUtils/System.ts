import {Book} from "../../Domain/Book";
import {testContainer} from "../../Infrastructure/Resources/services";
import {Books} from "../../Domain/Books";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {User} from "../../Domain/User";
import {Users} from "../../Domain/Users";
import {TestDbHelper} from "./Database/TestDbHelper";
import {BookIdentity} from "../../Domain/BookIdentity";
import {Borrowing} from "../../Domain/Borrowing";
import {Borrowings} from "../../Domain/Borrowings";
import {UserIdentity} from "../../Domain/UserIdentity";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";
import {BookBuilder} from "../Builder/BookBuilder";
import {UserBuilder} from "../Builder/UserBuilder";
import {Recommendations} from "../../Domain/Recommendations";
import {TestRequest} from "./TestRequest";
import {getRoute} from "../../selectDbFunction";

export class System
{
  public static hasBook(book: Book): void
  {
    testContainer.get<Books>(TYPES.Books).add(book);
  }

  public static hasBooksWithIds(bookIdentities: BookIdentity[]): void
  {
    bookIdentities.forEach((bookIdentity: BookIdentity) => this.hasBook(BookBuilder.default().withIdentity(bookIdentity).build()))
  }

  public static hasUser(user: User): void
  {
    testContainer.get<Users>(TYPES.Users).add(user);
  }

  public static hasUsersWithIds(userIdentities: UserIdentity[]): void
  {
    userIdentities.forEach((userIdentity: UserIdentity) => this.hasUser(UserBuilder.default().withIdentity(userIdentity).build()))
  }

  public static hasBorrowing(borrowing: Borrowing): void
  {
    testContainer.get<Borrowings>(TYPES.Borrowings).add(borrowing);
  }

  public static hasBorrowings(borrowings: Borrowing[]): void
  {
    borrowings.forEach((borrowing: Borrowing) => this.hasBorrowing(borrowing))
  }

  public static hasExcludedRecommendation(user: UserIdentity, excluded: BookIdentity): void
  {
    testContainer.get<Recommendations>(TYPES.Recommendations).excludeForUser(user, excluded);
  }

  public static getBookBy(identity: BookIdentity): Book
  {
    return testContainer.get<Books>(TYPES.Books).find(identity);
  }

  public static getUserBy(identity: UserIdentity): User
  {
    return testContainer.get<Users>(TYPES.Users).find(identity);
  }

  public static getBorrowingBy(identity: BorrowingIdentity): Borrowing
  {
    return testContainer.get<Borrowings>(TYPES.Borrowings).find(identity);
  }

  public static receivesRequest(request: TestRequest): any
  {
    return getRoute(
      request.action,
      testContainer.get<Borrowings>(TYPES.Borrowings),
      testContainer.get<Books>(TYPES.Books),
      testContainer.get<Users>(TYPES.Users),
      testContainer.get<Recommendations>(TYPES.Recommendations),
    )?.invoke(request.payload);
  }

  public static clearDb(): void
  {
    new TestDbHelper().clearTable('user');
    new TestDbHelper().clearTable('book');
    new TestDbHelper().clearTable('borrowed');
    new TestDbHelper().clearTable('recommendation');
  }
}
