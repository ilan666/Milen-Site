import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  baseAPIURL = environment.baseAPIURL;
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    return this.http
      .post<User>(this.baseAPIURL + 'account/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          if (res) {
            this.user.next(res);
            return res;
          } else return res;
        })
      );
  }

  signUp(name: string, email: string, password: string) {
    return this.http
      .post<User>(this.baseAPIURL + 'account/register', {
        username: name,
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          if (res) {
            this.user.next(res);
            return res;
          } else return res;
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'an Error Occured';

    if (!errorRes.error) {
      return throwError(errorMessage);
    } else {
      errorMessage = errorRes.error;
      return throwError(errorMessage);
    }
  }
}
