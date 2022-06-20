import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Me } from '../models/Me';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  readonly localKey = 'me';

  public isLoggedIn$: Observable<boolean>;
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _me: Me | undefined = undefined;

  constructor() {
    this.readToken();
    this.isLoggedIn$ = this._isLoggedIn$.asObservable().pipe(tap(isloggedin => console.log({isloggedin})), shareReplay(1));
  }

  hasToken(): boolean {
    if(this._me) {
      return true;
    }

    return false;
  }

  getToken(): string {
    if(this._me) {
      return this._me.token;
    }
    return '';
  }

  setToken(me: Me): void {
    this._me = me;
    localStorage.setItem(this.localKey, JSON.stringify(this._me));
    this._isLoggedIn$.next(true);
  }

  deleteToken(): void {
    this._me = undefined;
    localStorage.removeItem(this.localKey);
    this._isLoggedIn$.next(false);
  }

  checkTokenViaLocalStorage(): boolean {
    this.readToken();
    return this.hasToken();
  }

  private readToken(): void {
    const encodedData = localStorage.getItem(this.localKey);
    this._me = encodedData ? JSON.parse(encodedData) : undefined;
    this._isLoggedIn$.next(this.hasToken());
  }

}
