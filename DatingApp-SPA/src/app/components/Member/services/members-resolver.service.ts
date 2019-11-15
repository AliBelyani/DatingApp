import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../../User/user.model';
import { Observable, of } from 'rxjs';
import { UserService } from '../../User/user.service';
import { AlertifyService } from '../../shared/alertify.service';
import { PaginatedResult } from '../../shared/paginatedResult';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembersResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error(error);
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
