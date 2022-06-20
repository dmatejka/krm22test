import { Injectable } from "@angular/core";
import { IAdapter } from "../../core/models/IAdapter";

export class User {
  constructor(
    public id: number,
    public email: string,
    public first_name: string,
    public last_name: string,
    public img: string,
  ) {}
  get fullName() {
    return `${this.first_name} ${this.last_name}`
  }
}

export const initUser = () => {return new User( -1, '', '', '', '')};
@Injectable({
  providedIn: "root",
})
export class UserAdapter implements IAdapter<User> {
  adapt(item: any ): User {
    return new User(item.id, item.email, item.first_name, item.last_name, item.avatar);
  }
}
