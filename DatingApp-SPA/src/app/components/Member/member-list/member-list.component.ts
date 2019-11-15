import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';
import { AlertifyService } from '../../shared/alertify.service';
import { User, UserSearchParam } from '../../User/user.model';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { PaginationHeader, PaginatedResult } from '../../shared/paginatedResult';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: PaginationHeader;
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
  userParams: UserSearchParam = new UserSearchParam();

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.users = data.users.result;
        this.pagination = data.users.pagination;
      }
    );

    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  onPageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

  loadUser() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }
    );
  }

  onReset() {
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.loadUser();
  }

}
