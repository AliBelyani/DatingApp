import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberListComponent } from './member-list/member-list.component';

const appRoutes: Routes = [
  {
    path: '', component: MemberComponent, children: [
      { path: 'list', component: MemberListComponent }
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
