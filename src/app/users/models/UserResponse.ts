import { Injectable } from '@angular/core';
import { IAdapter } from 'src/app/core/models/IAdapter';
import { User, UserAdapter } from 'src/app/users/models/User';

type UserResponse = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class UserResponseAdapter implements IAdapter<User> {
  constructor(private adapter: UserAdapter) {}
  adapt(response: UserResponse): User {
    const userData = response.data;
    return this.adapter.adapt(userData);
  }
}
