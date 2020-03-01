import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupViewComponent } from './group-view/group-view.component';
import { MainPageViewComponent } from './main-page-view/main-page-view.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile-page/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginGuard } from './auth/_guards/login.guard';
import { GroupGuard } from './auth/_guards/group.guard';

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
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'groups/:groupId',
        canActivateChild: [GroupGuard],
        children: [
          { path: '', component: GroupViewComponent }
        ]
      },
      { path: 'profile', component: ProfileComponent },
      { path: '', component: MainPageViewComponent },
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
