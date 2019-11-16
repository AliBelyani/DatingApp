import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserResolver } from './user.resolver';


const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: '', component: UserListComponent, resolve: { userList: UserResolver } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
