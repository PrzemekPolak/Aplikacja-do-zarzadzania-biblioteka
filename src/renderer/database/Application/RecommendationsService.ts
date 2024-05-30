import {UserIdentity} from "../Domain/UserIdentity";
import {inject} from "inversify";
import {TYPES} from "../Infrastructure/Resources/AvailableInterfaces";
import {Borrowings} from "../Domain/Borrowings";
import {Pagination} from "../Filters/Pagination";
import {IdInListFilter} from "../Filters/IdInListFilter";
import {Borrowing} from "../Domain/Borrowing";
import {isEmptyArray} from "formik";
import {BookIdentity} from "../Domain/BookIdentity";
import {AverageRating} from "../Domain/AverageRating";
import {Recommendations} from "../Domain/Recommendations";

const RECOMMENDED_BY_SIMILARITY_AMOUNT: number = 2;

export class RecommendationsService
{
  public constructor(
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
    @inject(TYPES.Recommendations) private readonly recommendations: Recommendations,
  ) {
  }

  public getForUserBySimilarity(userIdentity: UserIdentity): BookIdentity[]
  {
    const booksReadByTargetUser = this.borrowings.getBorrowingsList(Pagination.all(), [IdInListFilter.forUser(userIdentity)])
      .map((borrowing: Borrowing) => borrowing.bookId);

    let firstPick: BookIdentity[] = [];
    let secondPick: BookIdentity[] = [];

    this.sortUsersBySimilarity(this.getOtherUsersWithSimilarInterest(booksReadByTargetUser, userIdentity)).forEach((user: UserIdentity) => {
      if (firstPick.length >= RECOMMENDED_BY_SIMILARITY_AMOUNT) {
        return;
      }

      const potentialBooks = this.findNotIncluded(
        this.borrowings.getBorrowingsList(Pagination.all(), [IdInListFilter.forUser(user)])
          .map((borrowing: Borrowing) => borrowing.bookId),
        booksReadByTargetUser.concat(this.recommendations.blockedByUser(userIdentity))
      );

      if (false === isEmptyArray(potentialBooks)) {
        firstPick.push(potentialBooks[0]);
        secondPick = secondPick.concat(potentialBooks.slice(1));
      }
    });

    return this.returnCorrectBooksIdentities(firstPick, secondPick);
  }

  public getForUserByRatings(userIdentity: UserIdentity): BookIdentity[]
  {
    const booksReadByTargetUser = this.borrowings.getBorrowingsList(Pagination.all(), [IdInListFilter.forUser(userIdentity)])
      .map((borrowing: Borrowing) => borrowing.bookId);

    return this.randomBookIdentities(this.borrowings.booksRatings([IdInListFilter.forBooksIds(booksReadByTargetUser.concat(this.recommendations.blockedByUser(userIdentity)), true)]), 6);
  }

  private getOtherUsersWithSimilarInterest(booksReadByUser: BookIdentity[], userIdentity: UserIdentity): UserIdentity[] {
    return this.borrowings.getBorrowingsList(Pagination.all(), [IdInListFilter.forBooksIds(booksReadByUser)])
      .filter((borrowing: Borrowing) => false === borrowing.userId.equals(userIdentity))
      .map((borrowing: Borrowing) => borrowing.userId);
  }

  private sortUsersBySimilarity(users: UserIdentity[]): UserIdentity[]
  {
    let count = {};
    users.forEach(function(i) { count[i.getValue()] = (count[i.getValue()]||0) + 1;});

    let keyValues: any = []

    for (let key in count) {
      keyValues.push([ key, count[key] ])
    }

    keyValues.sort(function(a, b) {
      return b[1] - a[1];
    })

    return keyValues.map((userIdentity: number) => UserIdentity.fromValue(userIdentity));
  }

  private findNotIncluded(potential: BookIdentity[], inList: BookIdentity[]): BookIdentity[]
  {
    let result: BookIdentity[] = [];

    potential.forEach((bookIdentity: BookIdentity) => {
      if (false === inList.some((book: BookIdentity) => book.equals(bookIdentity))) {
        result.push(bookIdentity);
      }
    })

    return result;
  }

  private returnCorrectBooksIdentities(firstPick: BookIdentity[], secondPick: BookIdentity[]): BookIdentity[]
  {
    if (firstPick.length === 0) {
      return [];
    }

    if (firstPick.length === RECOMMENDED_BY_SIMILARITY_AMOUNT) {
      return firstPick;
    }

    return firstPick.concat(secondPick.slice(0, RECOMMENDED_BY_SIMILARITY_AMOUNT - firstPick.length))
  }

  private randomBookIdentities(list: AverageRating[], count: number): BookIdentity[]
  {
    return list.slice(0, count).sort(() => 0.5 - Math.random()).map((averageRating: AverageRating) => averageRating.bookIdentity);
  }
}
