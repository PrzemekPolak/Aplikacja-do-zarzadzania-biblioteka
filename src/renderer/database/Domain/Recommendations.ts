import {BookIdentity} from "./BookIdentity";
import {UserIdentity} from "./UserIdentity";

export interface Recommendations
{
  blockedByUser(user: UserIdentity): BookIdentity[]

  excludeForUser(user: UserIdentity, book: BookIdentity): void
}
