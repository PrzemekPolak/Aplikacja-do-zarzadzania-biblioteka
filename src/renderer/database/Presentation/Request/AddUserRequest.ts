import {Address} from "../../Domain/Address";
import {PhoneNumber} from "../../Domain/PhoneNumber";

export class AddUserRequest
{
  private constructor(
    public readonly userName: string,
    public readonly surname: string,
    public readonly phoneNumber: PhoneNumber | null,
    public readonly address: Address | null,
  ) {
  }

  public static fromData(data: any): AddUserRequest
  {
    return new AddUserRequest(
        data.userName,
        data.surname,
        data.phone ? PhoneNumber.fromString(data.phone) : null,
        Address.create(
          data.city,
          data.street,
          data.streetNumber,
        ),
    );
  }
}
