import {Address} from "../../Domain/Address";
import {PhoneNumber} from "../../Domain/PhoneNumber";
import {User} from "../../Domain/User";
import {UserIdentity} from "../../Domain/UserIdentity";

export class UpdateUserRequest
{
  private constructor(
    public readonly user: User
  ) {
  }

  public static prepare(data: any): UpdateUserRequest
  {
    return new UpdateUserRequest(
      User.create(
        UserIdentity.fromString(data.entryId),
        data.userName,
        data.surname,
        data.phone ? PhoneNumber.fromString(data.phone) : null,
        Address.create(
          data.city,
          data.street,
          data.streetNumber,
        )
      )
    );
  }
}
