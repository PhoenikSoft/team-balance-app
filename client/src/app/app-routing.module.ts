import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupViewComponent } from './group-view/group-view.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile-page/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginGuard } from './auth/_guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    component: RegisterComponent
  },
  {
    path: 'profile',
    // canActivate: [LoginGuard],
    component: ProfileComponent
  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'groups/:groupId', component: GroupViewComponent },
      { path: '', component: MainPageComponent },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
