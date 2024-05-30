import {beforeEach, describe, expect, test} from "@jest/globals";
import {System} from "../TestUtils/System";
import {testContainer} from "../../Infrastructure/Resources/services";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {RecommendationsService} from "../../Application/RecommendationsService";
import {Borrowings} from "../../Domain/Borrowings";
import {UserIdentity} from "../../Domain/UserIdentity";
import {BookIdentity} from "../../Domain/BookIdentity";
import {BorrowingBuilder} from "../Builder/BorrowingBuilder";
import {Borrowing} from "../../Domain/Borrowing";
import {GetRecommendationsForUserAction} from "../../Presentation/Controller/GetRecommendationsForUserAction";
import {Books} from "../../Domain/Books";
import {Recommendations} from "../../Domain/Recommendations";
import {Rating} from "../../Application/Enum/Rating";

const userHasBorrowed = (user: UserIdentity, books: BookIdentity[]): void => {
  System.hasBorrowings(
    books.map((bookIdentity: BookIdentity): Borrowing  => BorrowingBuilder.default().withUserIdentity(user).withBookIdentity(bookIdentity).build())
  );
}

const expectArrayToContainBookIdentitiesInAnyOrder = (actual: BookIdentity[], expected: BookIdentity[]) => {
  expect(
    false === actual.map((actualBook: BookIdentity) => expected.some((expectedBook: BookIdentity) => expectedBook.equals(actualBook))).includes(false)
    && actual.length === expected.length
  ).toBe(true);
}

describe('Recommendations by similarity test', () => {
  const targetUser = UserIdentity.generate();
  const otherUser = UserIdentity.generate();
  const userWithSimilarities1 = UserIdentity.generate();
  const userWithSimilarities2 = UserIdentity.generate();
  const userWithSimilarities3 = UserIdentity.generate();
  const userWithoutSimilarities = UserIdentity.generate();

  const bookReadOnlyByTargetUser = BookIdentity.generate();
  const bookFromCommonInterest = BookIdentity.generate();
  const bookFromCommonInterest2 = BookIdentity.generate();
  const potentialBook1 = BookIdentity.generate();
  const potentialBook2 = BookIdentity.generate();
  const someBook = BookIdentity.generate();
  const bookExcludedByUser= BookIdentity.generate();
  const bookWithoutRating = BookIdentity.generate();

  let recommendationsService = new RecommendationsService(
    testContainer.get<Borrowings>(TYPES.Borrowings),
    testContainer.get<Recommendations>(TYPES.Recommendations),
  );

  beforeEach(() => {
    System.clearDb();
    System.hasUsersWithIds([targetUser, otherUser, userWithSimilarities1, userWithSimilarities2, userWithSimilarities3, userWithoutSimilarities]);
    System.hasBooksWithIds([bookReadOnlyByTargetUser, bookFromCommonInterest, bookFromCommonInterest2, potentialBook1, potentialBook2, someBook, bookExcludedByUser, bookWithoutRating]);
  });

  test('Recommendations are returned when there are two users with common interest', () => {
    userHasBorrowed(targetUser, [bookReadOnlyByTargetUser, bookFromCommonInterest]);
    userHasBorrowed(userWithSimilarities1, [bookFromCommonInterest, potentialBook1]);
    userHasBorrowed(userWithSimilarities2, [bookFromCommonInterest, potentialBook2]);

    let result = recommendationsService.getForUserBySimilarity(targetUser);

    expectArrayToContainBookIdentitiesInAnyOrder(result, [potentialBook1, potentialBook2]);
  });

  test('Recommendation is not returned when book recommended by similarity is excluded', () => {
    userHasBorrowed(targetUser, [bookReadOnlyByTargetUser, bookFromCommonInterest]);
    userHasBorrowed(userWithSimilarities1, [bookFromCommonInterest, potentialBook1]);
    System.hasExcludedRecommendation(targetUser, potentialBook1);

    expect(recommendationsService.getForUserBySimilarity(targetUser).length).toBe(0);
  });

  test('Recommendations are returned from one user only if he is the only valid', () => {
    userHasBorrowed(targetUser, [bookReadOnlyByTargetUser, bookFromCommonInterest]);
    userHasBorrowed(userWithSimilarities1, [bookFromCommonInterest, potentialBook1, potentialBook2]);

    expect(recommendationsService.getForUserBySimilarity(targetUser)).toStrictEqual([potentialBook1, potentialBook2]);
  });

  test('No recommendations returned when there are no similarities', () => {
    userHasBorrowed(targetUser, [bookReadOnlyByTargetUser]);
    userHasBorrowed(userWithoutSimilarities, [someBook]);

    expect(recommendationsService.getForUserBySimilarity(targetUser)).toStrictEqual([]);
  });

  test('Recommendations by similarity are returned for users with highest similarity', () => {
    userHasBorrowed(targetUser, [bookFromCommonInterest, bookFromCommonInterest2]);
    userHasBorrowed(userWithSimilarities1, [bookFromCommonInterest, bookFromCommonInterest2, potentialBook1]);
    userHasBorrowed(userWithSimilarities2, [bookFromCommonInterest, bookFromCommonInterest2, potentialBook2]);
    userHasBorrowed(userWithSimilarities3, [bookFromCommonInterest, someBook]);

    expectArrayToContainBookIdentitiesInAnyOrder(recommendationsService.getForUserBySimilarity(targetUser), [potentialBook1, potentialBook2]);
  });

  test('Recommendations by rating returns only books not read by user', () => {
    const bookReadByUser = BookIdentity.generate();
    const bookNotReadByUser = BookIdentity.generate();

    System.hasBorrowings([
      BorrowingBuilder.default().withBookIdentity(bookReadByUser).withUserIdentity(targetUser).withRating(Rating.One).build(),
      BorrowingBuilder.default().withBookIdentity(bookNotReadByUser).withUserIdentity(otherUser).withRating(Rating.Five).build(),
    ]);

    expectArrayToContainBookIdentitiesInAnyOrder(recommendationsService.getForUserByRatings(targetUser), [bookNotReadByUser])
  });

  test('Recommendation by rating only considers books with ratings', () => {
    System.hasBorrowings([
      BorrowingBuilder.default().withBookIdentity(bookWithoutRating).withUserIdentity(otherUser).build(),
    ]);

    expect(recommendationsService.getForUserByRatings(targetUser).length).toBe(0);
  });

  test('Recommendation by rating do not contains books excluded by user', () => {
    System.hasBorrowing(BorrowingBuilder.default().withBookIdentity(bookExcludedByUser).withUserIdentity(targetUser).withRating(Rating.One).build());
    System.hasExcludedRecommendation(targetUser, bookExcludedByUser);

    expect(recommendationsService.getForUserByRatings(targetUser).length).toBe(0);
  });

  test('Recommendations are correctly returned from endpoint', () => {
    userHasBorrowed(targetUser, [bookFromCommonInterest]);
    userHasBorrowed(userWithSimilarities1, [bookFromCommonInterest, potentialBook1]);

    let result = new GetRecommendationsForUserAction(
      testContainer.get<Books>(TYPES.Books),
      testContainer.get<Borrowings>(TYPES.Borrowings),
      testContainer.get<Recommendations>(TYPES.Recommendations),
    ).invoke({
      entryId: targetUser.getValue()
    });

    expect(result.recommendationsBySimilarity[0].id).toBe(potentialBook1.getValue());
  });
});
