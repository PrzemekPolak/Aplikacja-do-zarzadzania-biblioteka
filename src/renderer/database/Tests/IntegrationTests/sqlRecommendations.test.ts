import {beforeEach, describe, expect, test} from "@jest/globals";
import {System} from "../TestUtils/System";
import {testContainer} from "../../Infrastructure/Resources/services";
import {DbHelpers} from "../../Domain/DbHelpers";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {BookIdentity} from "../../Domain/BookIdentity";
import {SqlRecommendations} from "../../Infrastructure/SqlRecommendations";
import {UserIdentity} from "../../Domain/UserIdentity";

describe('Sql recommendations unit test', () => {
  const user = UserIdentity.generate();
  const bookToExclude = BookIdentity.generate();
  const excludedBook = BookIdentity.generate();
  let sqlRecommendations: SqlRecommendations;

  beforeEach(() => {
    System.clearDb();
    sqlRecommendations = new SqlRecommendations(testContainer.get<DbHelpers>(TYPES.DbHelpers))
  });

  test('Add missed recommendations for user', () => {
    expect(() => sqlRecommendations.excludeForUser(user, bookToExclude)).not.toThrow();
  });

  test('Add second excluded recommendation for user', () => {
    System.hasExcludedRecommendation(user, excludedBook);

    sqlRecommendations.excludeForUser(user, bookToExclude)

    expect(sqlRecommendations.blockedByUser(user)).toStrictEqual([excludedBook, bookToExclude]);
  });

  test('Duplicate excluded recommendation for user can not be added', () => {
    System.hasExcludedRecommendation(user, excludedBook);

    sqlRecommendations.excludeForUser(user, excludedBook)

    expect(sqlRecommendations.blockedByUser(user)).toStrictEqual([excludedBook]);
  });

  test('Get excluded recommendations for user', () => {
    System.hasExcludedRecommendation(user, bookToExclude);

    expect(sqlRecommendations.blockedByUser(user)).toStrictEqual([bookToExclude]);
  });

  test('Empty array is returned when there are no excluded recommendations for user', () => {
    expect(sqlRecommendations.blockedByUser(user)).toStrictEqual([]);
  });
});
