import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../../User/user.model';
import { Observable } from 'rxjs';
import { UserService } from '../../User/user.service';
import { AlertifyService } from '../../shared/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class MembersResolver implements Resolve<User[]> {

  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.userService.getUsers();
  }
}
