import { Injectable } from '@angular/core';
import { Me } from '../models/Me';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  readonly localKey = 'me';

  private _me: Me | undefined = undefined;

  constructor() {
    this.readToken();
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
  }

  deleteToken(): void {
    this._me = undefined;
    localStorage.removeItem(this.localKey);
  }

  checkTokenViaLocalStorage(): boolean {
    this.readToken();
    return this.hasToken();
  }

  private readToken(): void {
    const encodedData = localStorage.getItem(this.localKey);
    this._me = encodedData ? JSON.parse(encodedData) : undefined;
  }

}
