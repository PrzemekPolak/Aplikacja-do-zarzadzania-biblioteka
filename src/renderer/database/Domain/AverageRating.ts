import {BookIdentity} from "./BookIdentity";

export class AverageRating
{
  public constructor(
    public readonly bookIdentity: BookIdentity,
    public readonly value: number | null,
  ) {
  }
}
