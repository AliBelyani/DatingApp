import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule, CustomHammerConfig } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PaginationModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';

import { MemberRoutingModule } from './member-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberComponent } from './member.component';
import { MemberListItemComponent } from './member-list/member-list-item/member-list-item.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { FormsModule } from '@angular/forms';
import { MemberPhotoComponent } from './member-photo/member-photo.component';

@NgModule({
  declarations: [
    MemberComponent,
    MemberListComponent,
    MemberListItemComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberPhotoComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MemberRoutingModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  exports: [

  ]
})
export class MemberModule { }
