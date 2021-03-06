import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/components/User/user.model';
import { AuthService } from 'src/app/components/core/auth.service';
import { UserService } from 'src/app/components/User/user.service';
import { AlertifyService } from 'src/app/components/shared/alertify.service';

@Component({
  selector: 'app-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.css']
})
export class MemberListItemComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike() {
    const userId = this.authService.decodedToken.nameid;
    this.userService.sendLike(userId, this.user.id).subscribe(
      (data) => {
        this.alertify.success('Liked Successfully ' + this.user.knownAs);
      },
      error => this.alertify.error(error)
    );
  }

}
