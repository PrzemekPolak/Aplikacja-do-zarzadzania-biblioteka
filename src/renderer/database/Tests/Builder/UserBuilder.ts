import {User} from "../../Domain/User";
import {UserIdentity} from "../../Domain/UserIdentity";

export class UserBuilder
{
  private constructor(
    private user: any,
  ) {
  }

  public static default(): UserBuilder
  {
    return new UserBuilder({
      id: UserIdentity.generate().getValue(),
      userName: 'user name',
      surname: 'user surname',
      phone: '543765987',
      city: 'city',
      street: 'street',
      streetNumber: '12',
    });
  }

  public build(): User
  {
    return User.fromArray(this.user);
  }

  public withIdentity(userIdentity: UserIdentity): UserBuilder
  {
    this.user.id = userIdentity.getValue();

    return new UserBuilder(this.user);
  }

  public withUserName(userName: string): UserBuilder
  {
    this.user.userName = userName;

    return new UserBuilder(this.user);
  }
}
