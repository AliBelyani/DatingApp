import { Component, OnInit } from '@angular/core';
import { User, UserSearchParam } from '../user.model';
import { PaginationHeader, PaginatedResult } from '../../shared/paginatedResult';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../shared/alertify.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];
  pagination: PaginationHeader;
  userParams: UserSearchParam = new UserSearchParam();
  likeParam = 'true';

  constructor(private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        console.log(data);
        this.users = data.userList.result;
        this.pagination = data.userList.pagination;
      }
    );
  }

  onPageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

  loadUser() {
    this.userParams.like = this.likeParam === 'true' ? true : false;
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
        console.log(res);
        this.users = res.result;
        this.pagination = res.pagination;
      }
    );
  }

}
