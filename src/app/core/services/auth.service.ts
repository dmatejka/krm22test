import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, throwError, Subject, Observable, shareReplay } from 'rxjs';
import { ApiStatus } from 'src/app/users/services/users.service';
import { Me } from '../models/Me';
import { TokenService } from './token.service';

const baseUrl = "https://reqres.in/api/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginStatus$: Observable<ApiStatus>;
  private _loginStatus$: Subject<ApiStatus> = new Subject<ApiStatus>();


  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.loginStatus$ = this._loginStatus$.asObservable();
  }

  logout() {
    this.tokenService.deleteToken();
    this.router.navigate(['/','login'])
  }

  login(email:string, password: string): Observable<string> {
    if(!email || !password) return throwError(() => new Error('Email and password is required!'));

    const url = baseUrl;
    const params = new HttpParams().set('delay', '3');
    const body = {email, password}

    this._loginStatus$.next(ApiStatus.loading);

    return this.http.post(url, body, {params}).pipe(
      tap((data: any) => this.tokenService.setToken(new Me(data['token'])) ),
      tap( () => this._loginStatus$.next(ApiStatus.success)),
      catchError(error => {
        this._loginStatus$.next(ApiStatus.error);
        this.tokenService.deleteToken();
        return throwError(() => new Error(error))
      }),
    )
  }

}
