import {UserIdentity} from "./UserIdentity";
import {Address} from "./Address";
import {PhoneNumber} from "./PhoneNumber";

export class User
{
  private constructor(
    public readonly identity: UserIdentity,
    public readonly userName: string,
    public readonly surname: string,
    public readonly phone: PhoneNumber | null,
    public readonly address: Address | null,
  ) {
  }

  public static create(
    identity: UserIdentity,
    userName: string,
    surname: string,
    phone: PhoneNumber | null,
    address: Address | null,
  ): User
  {
    return new User(
      identity,
      userName,
      surname,
      phone,
      address,
    );
  }

  public static fromArray(
    dbArray: Array<any>,
  ): User
  {
    return new User(
      UserIdentity.fromString(dbArray['id']),
      dbArray['userName'],
      dbArray['surname'],
      dbArray['phone'] ? PhoneNumber.fromString(dbArray['phone']) : null,
      Address.create(
        dbArray['city'],
        dbArray['street'],
        dbArray['streetNumber'],
      ),
    )
  }
}
