import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule, CustomHammerConfig } from 'ngx-gallery';

import { MemberRoutingModule } from './member-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberComponent } from './member.component';
import { MemberListItemComponent } from './member-list/member-list-item/member-list-item.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MemberComponent,
    MemberListComponent,
    MemberListItemComponent,
    MemberDetailComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  exports: [

  ]
})
export class MemberModule { }
