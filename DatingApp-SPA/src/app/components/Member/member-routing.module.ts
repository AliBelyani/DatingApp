import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberResolver } from './services/member-resolver.service';
import { MembersResolver } from './services/members-resolver.service';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberEditResolver } from './services/member-edit.resolver';
import { PreventUnsavedChanges } from './services/prevent-unsaved-changes.guard';

const appRoutes: Routes = [
  {
    path: '', component: MemberComponent, children: [
      { path: '', component: MemberListComponent, resolve: { users: MembersResolver } },
      { path: 'edit', component: MemberEditComponent, resolve: { userEdit: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges] },
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
