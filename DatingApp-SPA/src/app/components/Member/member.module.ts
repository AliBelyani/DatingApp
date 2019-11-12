import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberRoutingModule } from './member-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberComponent } from './member.component';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule
  ],
  exports: [

  ]
})
export class MemberModule { }
