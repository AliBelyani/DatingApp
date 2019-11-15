import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Login } from '../auth.model';
import { AlertifyService } from '../../shared/alertify.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appTitle = 'DatingApp';
  loginModel: Login = new Login();
  photoUrl: string;
  jwtHelper = new JwtHelperService();

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.photoUrlSubject.subscribe(photoUrl => this.photoUrl = photoUrl);
    this.isLogin();
  }

  onLogin() {
    this.authService.login(this.loginModel).subscribe(
      res => {
        this.alertify.success('Logged In Successfully');
        this.router.navigate(['/member']);
      },
      error => this.alertify.error(error)
    );
  }

  isLogin() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertify.success('Logged Out Successfully');
    this.router.navigate(['']);
  }

}
