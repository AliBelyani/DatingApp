import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CoreRoutingModule,
    HeaderComponent
  ]
})
export class CoreModule { }
