import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { UserListItemComponent } from './user-list/user-list-item/user-list-item.component';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserListItemComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PaginationModule.forRoot(),
    FormsModule,
    ButtonsModule.forRoot()
  ]
})
export class UserModule { }
