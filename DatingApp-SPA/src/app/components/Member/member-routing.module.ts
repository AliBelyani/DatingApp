import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberResolver } from './member-resolver.service';
import { MembersResolver } from './members-resolver.service';

const appRoutes: Routes = [
  {
    path: '', component: MemberComponent, children: [
      { path: '', component: MemberListComponent, resolve: { users: MembersResolver } },
      { path: ':id', component: MemberDetailComponent, resolve: { user: MemberResolver } }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MemberRoutingModule { }
