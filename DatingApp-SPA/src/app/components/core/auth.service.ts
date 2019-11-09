import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './auth.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl = 'http://localhost:5000/api/auth/';

  constructor(private httpClient: HttpClient) { }

  login(login: Login) {
    return this.httpClient.post(this.apiUrl + 'login', login).pipe(
      map(
        (res: any) => {
          localStorage.setItem('token', res.token);
        }
      )
    );
  }

  register(registerModel: Login) {
    return this.httpClient.post(this.apiUrl + 'register', registerModel);
  }

}
