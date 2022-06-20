import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { ListPage } from 'src/app/core/models/ListPage';
import { User } from 'src/app/users/models/User';
import { UserResponseAdapter } from '../models/UserResponse';
import { UserListResponseAdapter } from '../models/UsersResponse';

const baseUrl = "https://reqres.in/api/users";

export const enum ApiStatus {
  loading = 'loading',
  error = 'error',
  success = 'success',
}

@Injectable()
export class UsersService {
  public listStatus$: Observable<ApiStatus>;
  public userStatus$: Observable<ApiStatus>;

  private _listStatus$: Subject<ApiStatus> = new Subject<ApiStatus>();
  private _userStatus$: Subject<ApiStatus> = new Subject<ApiStatus>();

  constructor(
    private http: HttpClient,
    private usersResponseAdapter: UserListResponseAdapter,
    private userResponseAdapter: UserResponseAdapter,
  ) {
    this.listStatus$ = this._listStatus$.asObservable();
    this.userStatus$ = this._userStatus$.asObservable();
  }

  // public getPageStatus(): Observable<string> {
  //   return
  // }

  public getPage(page: number,per_page: number = 8): Observable<ListPage<User>> {
    const url = baseUrl;
    const params = new HttpParams().set('delay', '3').set('page', page.toString()).set('per_page', per_page.toString());

    this._listStatus$.next(ApiStatus.loading);

    return this.http.get(url, {params}).pipe(
      tap(page => console.log({page})),
      map((listPage:any) => this.usersResponseAdapter.adapt(listPage)),
      tap( () => this._listStatus$.next(ApiStatus.success)),
      shareReplay(1),
      catchError(error => {
        this._listStatus$.next(ApiStatus.error);
        return throwError(() => new Error(error))
      }),
    );
  }
  public getUser(id: number): Observable<User> {
    if(!id) return throwError(() => new Error('User id is required!'));

    const url = `${baseUrl}/${id}`;
    const params = new HttpParams().set('delay', '3');

    this._userStatus$.next(ApiStatus.loading);

    return this.http.get(url,{params}).pipe(
      map((item:any) => this.userResponseAdapter.adapt(item)),
      tap( () => this._userStatus$.next(ApiStatus.success)),
      catchError(error => {
        this._userStatus$.next(ApiStatus.error);
        return throwError(() => new Error(error))
      }),
    );
  }



}
