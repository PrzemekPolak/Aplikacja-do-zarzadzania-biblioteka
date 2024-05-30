import {Controller} from "./Controller";
import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Books} from "../../Domain/Books";
import {RecommendationsService} from "../../Application/RecommendationsService";
import {Borrowings} from "../../Domain/Borrowings";
import {UserIdentity} from "../../Domain/UserIdentity";
import {BookIdentity} from "../../Domain/BookIdentity";
import {BookView} from "../View/BookView";
import {Recommendations} from "../../Domain/Recommendations";

export class GetRecommendationsForUserAction implements Controller
{
  public constructor(
    @inject(TYPES.Books) private readonly books: Books,
    @inject(TYPES.Borrowings) private readonly borrowings: Borrowings,
    @inject(TYPES.Recommendations) private readonly recommendations: Recommendations,
  ) {
  }

  public invoke(request: { entryId: number }): any
  {
    const recommendationsService = new RecommendationsService(this.borrowings, this.recommendations);
    const recommendationsBySimilarity = recommendationsService.getForUserBySimilarity(UserIdentity.fromValue(request.entryId));
    const recommendationsByRating = recommendationsService.getForUserByRatings(UserIdentity.fromValue(request.entryId));

    return {
      recommendationsBySimilarity: this.mapToBooksList(recommendationsBySimilarity),
      recommendationsByRating: this.mapToBooksList(this.removeDuplicates(recommendationsByRating, recommendationsBySimilarity)),
    };
  }

  private mapToBooksList(bookIdentities: BookIdentity[]): BookView[]
  {
    return bookIdentities.map((bookIdentity: BookIdentity) => BookView.create(
      this.books.find(bookIdentity),
      this.borrowings.bookRating(bookIdentity).value,
    ));
  }

  private removeDuplicates(fromList: BookIdentity[], potentialDuplicates: BookIdentity[]): BookIdentity[]
  {
    return fromList
      .filter((bookIdentity: BookIdentity) => false === potentialDuplicates.some((potentialDuplicate: BookIdentity) => bookIdentity.equals(potentialDuplicate)))
      .slice(0, 4 - potentialDuplicates.length)
  }
}
