import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListPage } from 'src/app/core/models/ListPage';
import { User } from 'src/app/users/models/User';
import { UserResponseAdapter } from '../models/UserResponse';
import { UserListResponseAdapter } from '../models/UsersResponse';

@Injectable()
export class UsersService {
  private baseUrl = "https://reqres.in/api/users";

  constructor(
    private http: HttpClient,
    private usersResponseAdapter: UserListResponseAdapter,
    private userResponseAdapter: UserResponseAdapter,
  ) { }

  // public getUsers(): Observable<User[]> {
  //   return this.http.get(this.baseUrl).pipe(
  //     map((list:any) => this.usersResponseAdapter.adapt(list))
  //   );
  // }
  public getPage(page: number): Observable<ListPage<User>> {
    const url = `${this.baseUrl}?page=${page}`;
    return this.http.get(url).pipe(
      map((listPage:any) => this.usersResponseAdapter.adapt(listPage))
    );
  }
  public getUser(id: number): Observable<User | undefined> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url).pipe(
      map((item:any) => this.userResponseAdapter.adapt(item))
    );
  }



}
