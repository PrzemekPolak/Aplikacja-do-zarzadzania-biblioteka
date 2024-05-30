import {UserIdentity} from "../../Domain/UserIdentity";

export class AddOrUpdateUserRequestBuilder
{
  private constructor(
    private request: any,
  ) {
  }

  public static default(): AddOrUpdateUserRequestBuilder
  {
    return new AddOrUpdateUserRequestBuilder({
      entryId: 12,
      userName: 'user name',
      surname: 'user surname',
      phone: '543765987',
      city: 'city',
      street: 'street',
      streetNumber: '12',
    });
  }

  public build(): any
  {
    return this.request;
  }

  public withUserName(userName: string): AddOrUpdateUserRequestBuilder
  {
    this.request.userName = userName;

    return new AddOrUpdateUserRequestBuilder(this.request);
  }

  public withIdentityToUpdate(userIdentity: UserIdentity): AddOrUpdateUserRequestBuilder
  {
    this.request.entryId = userIdentity.getValue();

    return new AddOrUpdateUserRequestBuilder(this.request);
  }
}
