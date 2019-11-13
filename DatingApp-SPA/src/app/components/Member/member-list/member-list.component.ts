import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';
import { AlertifyService } from '../../shared/alertify.service';
import { User } from '../../User/user.model';
import { ActivatedRoute, Router, Data } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => this.users = data.users,
      (error) => {
        this.alertify.error(error);
        this.router.navigate(['/']);
      }
    );
  }

}
