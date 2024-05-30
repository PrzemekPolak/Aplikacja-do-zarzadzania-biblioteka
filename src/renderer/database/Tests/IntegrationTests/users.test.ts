import {beforeEach, describe, expect, test} from "@jest/globals";
import {System} from "../TestUtils/System";
import {testContainer} from "../../Infrastructure/Resources/services";
import {TYPES} from "../../Infrastructure/Resources/AvailableInterfaces";
import {Users} from "../../Domain/Users";
import {AddUserAction} from "../../Presentation/Controller/AddUserAction";
import {GetUsersListAction} from "../../Presentation/Controller/GetUsersListAction";
import {UserBuilder} from "../Builder/UserBuilder";
import {GetUserAction} from "../../Presentation/Controller/GetUserAction";
import {TestDbHelper} from "../TestUtils/Database/TestDbHelper";
import {UserIdentity} from "../../Domain/UserIdentity";
import {AddOrUpdateUserRequestBuilder} from "../Builder/AddOrUpdateUserRequestBuilder";
import {UpdateUserAction} from "../../Presentation/Controller/UpdateUserAction";
import {NotFoundException} from "../../Exception/NotFoundException";
import {ExampleRequest} from "../Builder/ExampleRequest";
import {DbTable} from "../../db.model";

describe('Sql users test', () => {
  const user = UserBuilder.default().build();
  const userIdentity = UserIdentity.generate();

  beforeEach(() => {
    System.clearDb();
    (new TestDbHelper()).clearAutoIncrement('user')
  });

  test('User can be added', () => {
    let result = new AddUserAction(testContainer.get<Users>(TYPES.Users)).invoke(AddOrUpdateUserRequestBuilder.default().build());

    expect(result['state']['success']).toBe(true);
  });

  test('User can be updated', () => {
    const newUserName = 'new name';

    System.hasUser(UserBuilder.default().withIdentity(userIdentity).withUserName('old name').build())

    new UpdateUserAction(testContainer.get<Users>(TYPES.Users)).invoke(
      AddOrUpdateUserRequestBuilder.default().withIdentityToUpdate(userIdentity).withUserName(newUserName).build()
    );

    expect(System.getUserBy(userIdentity).userName).toBe(newUserName);
  });

  test('Delete user by Id', () => {
    System.hasUser(user);

    let result = System.receivesRequest(ExampleRequest.deleteRecord(user.identity.getValue(), DbTable.User));

    expect(result['state']['success']).toBe(true);
    expect(() => System.getUserBy(user.identity)).toThrow(NotFoundException);
  });

  test('User can be found by identity', () => {
    System.hasUser(UserBuilder.default().withIdentity(userIdentity).build());

    let result = (new GetUserAction(testContainer.get<Users>(TYPES.Users))).invoke({
      entryId: userIdentity.getValue(),
    });

    expect(result.id).toBe(userIdentity.getValue());
  });

  test('Users list is returned correctly', () => {
    System.hasUser(user);

    let result = (new GetUsersListAction(testContainer.get<Users>(TYPES.Users))).invoke({
      'search': null,
      'sortDirection': 'DESC',
      'orderBy': 'ID',
      'page': 1
    });

    expect(result['listData'].length).toBe(1);
    expect(result['listData'][0].userName).toBe(user.userName);
    expect(result['fullLength']).toBe(1);
  });

  test('Generating identity for new users works correctly', () => {
    const secondUserName = 'second user name';
    System.hasUser(UserBuilder.default().withIdentity(UserIdentity.fromValue(1)).build());

    new AddUserAction(testContainer.get<Users>(TYPES.Users)).invoke(AddOrUpdateUserRequestBuilder.default().withUserName(secondUserName).build());

    expect(System.getUserBy(UserIdentity.fromValue(2)).userName).toBe(secondUserName);
  });
});
