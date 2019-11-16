import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User, UserSearchParam } from './user.model';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { AlertifyService } from '../shared/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;
  userParam: UserSearchParam = new UserSearchParam();

  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    this.userParam.like = true;
    return this.userService.getUsers(this.pageNumber, this.pageSize, this.userParam).pipe(
      catchError(error => {
        this.alertify.error(error);
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }

}
