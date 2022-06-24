import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          // Client side error
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Server side error
          if (error?.error?.error) {
            errorMsg = `${error.error.error}`;

            this._snackBar.open(errorMsg, 'OK', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'error',
            });
          }
        }
        console.error(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
