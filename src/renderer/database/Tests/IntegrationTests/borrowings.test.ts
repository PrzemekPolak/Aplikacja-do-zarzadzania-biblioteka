import {beforeEach, describe, expect, test} from "@jest/globals";
import {System} from "../TestUtils/System";
import {testContainer} from "../../Infrastructure/Resources/services";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Borrowings} from "../../Domain/Borrowings";
import {GetBorrowingAction} from "../../Presentation/Controller/GetBorrowingAction";
import {BorrowingBuilder} from "../Builder/BorrowingBuilder";
import {Books} from "../../Domain/Books";
import {Users} from "../../Domain/Users";
import {BookBuilder} from "../Builder/BookBuilder";
import {UserBuilder} from "../Builder/UserBuilder";
import {TestDbHelper} from "../TestUtils/Database/TestDbHelper";
import {GetBorrowingsListAction} from "../../Presentation/Controller/GetBorrowingsListAction";
import {GetBorrowingsListForBookAction} from "../../Presentation/Controller/GetBorrowingsListForBookAction";
import {GetBorrowingsListForUserAction} from "../../Presentation/Controller/GetBorrowingsListForUserAction";
import {BookIdentity} from "../../Domain/BookIdentity";
import {FinishBorrowingAction} from "../../Presentation/Controller/FinishBorrowingAction";
import {NotFoundException} from "../../Exception/NotFoundException";
import {Rating} from "../../Application/Enum/Rating";
import {ExampleRequest} from "../Builder/ExampleRequest";
import {BorrowingIdentity} from "../../Domain/BorrowingIdentity";
import {DbTable} from "../../db.model";
import {AddOrUpdateBorrowingRequestBuilder} from "../Builder/AddOrUpdateBorrowingRequestBuilder";

describe('Sql borrowing test', () => {
  const borrowingIdentity = BorrowingIdentity.generate();

  beforeEach(() => {
    System.clearDb();
    (new TestDbHelper()).clearAutoIncrement('user')
  });

  test('Borrowing can be added', () => {
    let result = System.receivesRequest(ExampleRequest.addBorrowing(AddOrUpdateBorrowingRequestBuilder.default().build()));

    expect(result['state']['success']).toBe(true);
  });

  test('Borrowing can be updated', () => {
    const newBookIdentity = BookIdentity.fromValue(1111);
    const borrowing = BorrowingBuilder.default().withBookIdentity(BookIdentity.fromValue(7777)).build();

    System.hasBorrowing(borrowing)

    System.receivesRequest(ExampleRequest.updateBorrowing(
      AddOrUpdateBorrowingRequestBuilder.default().withIdentity(borrowing.identity).withBookIdentity(newBookIdentity).build()
    ));

    expect(System.getBorrowingBy(borrowing.identity).bookId).toStrictEqual(newBookIdentity);
  });

  test('Delete borrowing by Id', () => {
    System.hasBorrowing(BorrowingBuilder.default().withIdentity(borrowingIdentity).build());

    const result = System.receivesRequest(ExampleRequest.deleteRecord(borrowingIdentity.toString(), DbTable.Borrowed))

    expect(result['state']['success']).toBe(true);
    expect(() => System.getBorrowingBy(borrowingIdentity)).toThrow(NotFoundException);
  });

  test('Borrowing can be finished', () => {
    const borrowing = BorrowingBuilder.default().build();

    System.hasBorrowing(borrowing)

    new FinishBorrowingAction(testContainer.get<Borrowings>(TYPES.Borrowings)).invoke({
      entryId: borrowing.identity.toString(),
    });

    expect(null === System.getBorrowingBy(borrowing.identity).returnedDate).toBe(false);
  });

  test('User can rate borrowing', () => {
    const rating = Rating.Four;

    System.hasBorrowing(BorrowingBuilder.default().withIdentity(borrowingIdentity).withRating(null).build())

    System.receivesRequest(ExampleRequest.rateBorrowing(borrowingIdentity, rating));

    expect(System.getBorrowingBy(borrowingIdentity).getRating()).toStrictEqual(rating);
  });

  test('User can remove rating of borrowing', () => {
    const borrowingIdentity = BorrowingIdentity.generate();

    System.hasBorrowing(BorrowingBuilder.default().withIdentity(borrowingIdentity).withRating(Rating.Five).build())

    System.receivesRequest(ExampleRequest.rateBorrowing(borrowingIdentity, null));

    expect(System.getBorrowingBy(borrowingIdentity).getRating()).toBe(null);
  });

  test('User can get single borrowing', () => {
    const book = BookBuilder.default().build();
    const user = UserBuilder.default().build();
    const borrowing = BorrowingBuilder.default().withBookIdentity(book.identity).withUserIdentity(user.identity).build();

    System.hasBook(book);
    System.hasUser(user);
    System.hasBorrowing(borrowing);

    let result = new GetBorrowingAction(
      testContainer.get<Borrowings>(TYPES.Borrowings),
      testContainer.get<Books>(TYPES.Books),
      testContainer.get<Users>(TYPES.Users),
    ).invoke({
      entryId: borrowing.identity.toString(),
    });

    expect(result.id).toBe(borrowing.identity.toString());
    expect(result.bookId).toBe(borrowing.bookId.getValue());
    expect(result.userId).toBe(borrowing.userId.getValue());
  });

  test('User can get list of borrowings', () => {
    const book = BookBuilder.default().build();
    const user = UserBuilder.default().build();
    const borrowing = BorrowingBuilder.default().withBookIdentity(book.identity).withUserIdentity(user.identity).build();

    System.hasBook(book);
    System.hasUser(user);
    System.hasBorrowing(borrowing);

    let result = new GetBorrowingsListAction(
      testContainer.get<Borrowings>(TYPES.Borrowings),
      testContainer.get<Books>(TYPES.Books),
      testContainer.get<Users>(TYPES.Users),
    ).invoke({
      search: null,
      sortDirection: 'DESC',
      orderBy: 'ID',
      page: 1,
      borrowedOnly: false,
    });

    const resultFirstBorrowing = result['listData'][0];

    expect(resultFirstBorrowing.id).toBe(borrowing.identity.toString());
    expect(result['fullLength']).toBe(1);
    expect(resultFirstBorrowing.bookId).toBe(borrowing.bookId.getValue());
    expect(resultFirstBorrowing.userId).toBe(borrowing.userId.getValue());
  });

  test('User can get view of borrowings list for specific book', () => {
    const book = BookBuilder.default().build();
    const user = UserBuilder.default().build();
    const borrowing = BorrowingBuilder.default().withBookIdentity(book.identity).withUserIdentity(user.identity).build();

    System.hasBook(book);
    System.hasUser(user);
    System.hasBorrowing(borrowing);

    let result = new GetBorrowingsListForBookAction(
      testContainer.get<Borrowings>(TYPES.Borrowings),
      testContainer.get<Users>(TYPES.Users),
    ).invoke({
      entryId: book.identity.getValue(),
      search: null,
      sortDirection: 'DESC',
      orderBy: 'ID',
      page: 1,
      borrowedOnly: false,
    });

    const resultFirstBorrowing = result['listData'][0];

    expect(resultFirstBorrowing.id).toBe(borrowing.identity.toString());
    expect(resultFirstBorrowing.bookId).toBe(borrowing.bookId.getValue());
    expect(resultFirstBorrowing.title).toBe(undefined);
  });

  test('User can get view of borrowings list for specific user', () => {
    const book = BookBuilder.default().build();
    const user = UserBuilder.default().build();
    const borrowing = BorrowingBuilder.default().withBookIdentity(book.identity).withUserIdentity(user.identity).build();

    System.hasBook(book);
    System.hasUser(user);
    System.hasBorrowing(borrowing);

    let result = new GetBorrowingsListForUserAction(
      testContainer.get<Borrowings>(TYPES.Borrowings),
      testContainer.get<Books>(TYPES.Books),
    ).invoke({
      entryId: user.identity.getValue(),
      search: null,
      sortDirection: 'DESC',
      orderBy: 'ID',
      page: 1,
      borrowedOnly: false,
    });

    const resultFirstBorrowing = result['listData'][0];

    expect(resultFirstBorrowing.id).toBe(borrowing.identity.toString());
    expect(resultFirstBorrowing.userId).toBe(borrowing.userId.getValue());
    expect(resultFirstBorrowing.userName).toBe(undefined);
  });
});
