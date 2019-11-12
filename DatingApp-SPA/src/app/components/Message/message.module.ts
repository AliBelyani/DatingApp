import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [
    MessageListComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule
  ],
  exports: [

  ]
})
export class MessageModule { }
