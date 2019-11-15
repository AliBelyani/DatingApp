import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../../User/user.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../User/user.service';
import { AuthService } from '../../core/auth.service';
import { AlertifyService } from '../../shared/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User>{

  constructor(private userService: UserService, private authService: AuthService,
    private alertify: AlertifyService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = this.authService.decodedToken.nameid;
    return this.userService.getUser(id).pipe(
      catchError(error => {
        this.alertify.error(error);
        this.router.navigate(['/member']);
        return of(null);
      })
    );
  }

}
