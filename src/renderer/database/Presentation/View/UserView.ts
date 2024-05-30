import {User} from "../../Domain/User";

export class UserView
{
  public static create(user: User): any
  {
    return {
      id: user.identity.getValue(),
      userName: user.userName,
      surname: user.surname,
      phone: user.phone?.toString(),
      city: user.address?.city,
      street: user.address?.street,
      streetNumber: user.address?.streetNumber,
    }
  }
}
