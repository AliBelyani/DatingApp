import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Register } from './auth.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../User/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  currentUser: User;
  decodedToken: any;
  photoUrlSubject = new BehaviorSubject<string>('../../../assets/user.png');

  constructor(private httpClient: HttpClient) { }

  login(login: Login) {
    return this.httpClient.post(this.apiUrl + 'login', login).pipe(
      map(
        (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.currentUser = res.user;
          this.photoUrlSubject.next(this.currentUser.photoUrl);
        }
      )
    );
  }

  register(registerModel: Register) {
    return this.httpClient.post(this.apiUrl + 'register', registerModel);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
