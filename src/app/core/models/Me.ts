import { User } from "src/app/users/models/User";

export class Me {
  constructor(
    public user: User,
    public token: string
  ) { }
}
