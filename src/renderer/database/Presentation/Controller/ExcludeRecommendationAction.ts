import {inject} from "inversify";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Controller} from "./Controller";
import {AbstractController} from "./AbstractController";
import {Recommendations} from "../../Domain/Recommendations";
import {UserIdentity} from "../../Domain/UserIdentity";
import {BookIdentity} from "../../Domain/BookIdentity";

export class ExcludeRecommendationAction extends AbstractController implements Controller
{
  public constructor(
    @inject(TYPES.Recommendations) private readonly recommendations: Recommendations,
  ) {
    super();
  }

  public invoke(request: any): any
  {
    return super.actionCompletionStatusForSaving(() => {
      this.recommendations.excludeForUser(UserIdentity.fromValue(request.userId), BookIdentity.fromValue(request.bookId));
    });
  }
}
