import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user.model';
import { AuthService } from 'src/app/components/core/auth.service';
import { UserService } from '../../user.service';
import { AlertifyService } from 'src/app/components/shared/alertify.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
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
