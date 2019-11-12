import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Login } from '../auth.model';
import { AlertifyService } from '../../shared/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appTitle = 'DatingApp';
  loginModel: Login = new Login();
  decodedToken: any;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.isLogin();
    this.loadTokenData();
  }

  onLogin() {
    this.authService.login(this.loginModel).subscribe(
      res => {
        this.alertify.success('Logged In Successfully');
        this.loadTokenData();
      },
      error => this.alertify.error(error)
    );
  }

  isLogin() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.success('Logged Out Successfully');
    this.router.navigate(['']);
  }

  loadTokenData() {
    this.decodedToken = this.authService.getDecodedToken();
  }

}
