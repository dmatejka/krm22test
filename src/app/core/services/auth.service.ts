import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  tap,
  catchError,
  throwError,
  Subject,
  Observable,
  shareReplay,
} from 'rxjs';
import { ApiStatus } from 'src/app/core/models/ApiStatus';
import { Me } from '../models/Me';
import { TokenService } from './token.service';

const baseUrl = 'https://reqres.in/api/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: Observable<boolean>;
  public logingInStatus$: Observable<ApiStatus>;

  private _logingInStatus$: Subject<ApiStatus> = new Subject<ApiStatus>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.logingInStatus$ = this._logingInStatus$.asObservable();
    this.isLoggedIn$ = this.tokenService.isLoggedIn$;
  }

  logout() {
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

  login(email: string, password: string): Observable<string> {
    if (!email || !password)
      return throwError(() => new Error('Email and password is required!'));

    const url = baseUrl;
    const params = new HttpParams().set('delay', '3');
    const body = { email, password };

    this._logingInStatus$.next(ApiStatus.Loading);

    return this.http.post(url, body, { params }).pipe(
      tap((data: any) => this.tokenService.setToken(new Me(data['token']))),
      tap(() => this._logingInStatus$.next(ApiStatus.Success)),
      catchError((error) => {
        this._logingInStatus$.next(ApiStatus.Error);
        this.tokenService.deleteToken();
        return throwError(() => new Error(error));
      })
    );
  }
}
