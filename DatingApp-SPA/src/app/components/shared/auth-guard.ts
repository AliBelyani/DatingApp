import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLogin = this.authService.loggedIn();
    if (isLogin) {
      return true;
    }
    this.alertify.error('You Cant Access This Route!!!!');
    this.router.navigate(['']);
  }
}
