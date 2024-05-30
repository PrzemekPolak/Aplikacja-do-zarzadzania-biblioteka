import {beforeEach, describe, expect, test} from "@jest/globals";
import {System} from "../TestUtils/System";
import {testContainer} from "../../Infrastructure/Resources/services";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {SqlBorrowings} from "../../Infrastructure/SqlBorrowings";
import {DbHelpers} from "../../Domain/DbHelpers";
import {BorrowingBuilder} from "../Builder/BorrowingBuilder";
import {Rating} from "../../Application/Enum/Rating";
import {BookIdentity} from "../../Domain/BookIdentity";
import {AverageRating} from "../../Domain/AverageRating";
import {IdInListFilter} from "../../Filters/IdInListFilter";

describe('Sql borrowings unit test', () => {
  let sqlBorrowings: SqlBorrowings;

  beforeEach(() => {
    System.clearDb();
    sqlBorrowings = new SqlBorrowings(testContainer.get<DbHelpers>(TYPES.DbHelpers))
  });

  test('Get average rating for book', () => {
    const bookIdentity = BookIdentity.generate();

    System.hasBorrowings([
      BorrowingBuilder.default().withBookIdentity(bookIdentity).withRating(Rating.Five).build(),
      BorrowingBuilder.default().withBookIdentity(bookIdentity).withRating(Rating.One).build(),
    ]);

    expect(sqlBorrowings.bookRating(bookIdentity)).toStrictEqual(new AverageRating(bookIdentity, 3));
  });

  test('Get books ratings by highest', () => {
    const bookWithHigherRating = BookIdentity.generate();
    const bookWithLowerRating = BookIdentity.generate();

    System.hasBorrowings([
      BorrowingBuilder.default().withBookIdentity(bookWithLowerRating).withRating(Rating.Five).build(),
      BorrowingBuilder.default().withBookIdentity(bookWithLowerRating).withRating(Rating.One).build(),
      BorrowingBuilder.default().withBookIdentity(bookWithHigherRating).withRating(Rating.Four).build(),
    ]);

    const booksRatings = sqlBorrowings.booksRatings([])

    expect(booksRatings[0].bookIdentity).toStrictEqual(bookWithHigherRating);
    expect(booksRatings[1].bookIdentity).toStrictEqual(bookWithLowerRating);
  });

  test('Book can be excluded from list using filter', () => {
    const bookToExclude = BookIdentity.generate();

    System.hasBorrowings([
      BorrowingBuilder.default().withBookIdentity(bookToExclude).withRating(Rating.Five).build(),
    ]);

    expect(sqlBorrowings.booksRatings([IdInListFilter.forBooksIds([bookToExclude], true)]).length).toBe(0);
  });

  test('Average rating is null when there are no past borrowings for the book', () => {
    const bookWithoutBorrowing = BookIdentity.generate();

    expect(sqlBorrowings.bookRating(bookWithoutBorrowing).value).toBe(null);
  });
});
