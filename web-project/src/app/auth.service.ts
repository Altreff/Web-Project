import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:4200';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  login(user: User): Observable<any> {
    return this.httpClient.post<{ token: string }>(`${this.AUTH_SERVER}/login`, user).pipe(
      tap((res: { token: string }) => {
        if (res.token) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', res.token);
            this.authSubject.next(true);
          }
        } else {
          // Обработка ошибки аутентификации
          console.error('Ошибка аутентификации: недействительный токен');
        }
      }),
      catchError((err) => {
        // Обработка ошибок сети или сервера
        console.error('Ошибка сети или сервера', err);
        return throwError(err);
      })
    );
  }



  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('access_token');
    this.authSubject.next(false);
  }

}
