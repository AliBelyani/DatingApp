import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Login } from '../auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appTitle = 'DatingApp';
  loginModel: Login = new Login();
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLogin();
  }

  onLogin() {
    console.log(this.loginModel);
    this.authService.login(this.loginModel).subscribe(
      res => {
        this.isLoggedIn = true;
      },
      error => console.log(error)
    );
  }

  isLogin() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout() {
    localStorage.removeItem('token');
  }

}
