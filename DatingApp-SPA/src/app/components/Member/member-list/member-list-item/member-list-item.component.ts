import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/components/User/user.model';

@Component({
  selector: 'app-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.css']
})
export class MemberListItemComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
