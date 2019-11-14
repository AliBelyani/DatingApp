import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../User/user.model';
import { ActivatedRoute, Data } from '@angular/router';
import { AlertifyService } from '../../shared/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../User/user.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  @ViewChild('memberForm', null) memberForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotify($event: any) {
    if (this.memberForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => this.user = data.userEdit
    );

    this.authService.photoUrlSubject.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  onSubmit() {
    this.userService.updateUser(this.authService.getDecodedToken().nameid, this.user).subscribe(
      (data) => {
        console.log(this.user);
        this.alertify.success('Profile Updated Successfully!');
        this.memberForm.reset(this.user);
      },
      error => this.alertify.error(error)
    );

  }
}
