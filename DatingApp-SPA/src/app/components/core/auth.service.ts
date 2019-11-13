import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './auth.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();

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

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getDecodedToken() {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }

}
