import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/core/home/home.component';
import { RegisterComponent } from './components/core/register/register.component';
import { AuthGuard } from './components/shared/auth-guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'member', canActivate: [AuthGuard], loadChildren: './components/Member/member.module#MemberModule' },
  { path: 'message', canActivate: [AuthGuard], loadChildren: './components/Message/message.module#MessageModule' },
  { path: 'user', canActivate: [AuthGuard], loadChildren: './components/User/user.module#UserModule' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
