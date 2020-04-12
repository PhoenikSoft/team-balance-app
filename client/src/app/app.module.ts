import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { MainPageViewComponent } from './main-page-view/main-page-view.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { AddGameDialogComponent } from './add-game-dialog/add-game-dialog.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile-page/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { LogoutComponent } from './auth/logout/logout.component';
import { YourGroupsComponent } from './your-groups/your-groups.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateDialogComponent } from './profile-page/update-dialog/update-dialog.component';
import { AddGroupDialogComponent } from './add-group-dialog/add-group-dialog.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ClipboardModule } from 'ngx-clipboard';
import { GameViewComponent } from './game-view/game-view.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { BalancedTeamsTableComponent } from './balanced-teams-table/balanced-teams-table.component';
import { AddPlayerDialogComponent } from './add-player-dialog/add-player-dialog.component';
import { AddPlayerDialogViewComponent } from './add-player-dialog-view/add-player-dialog-view.component';


@NgModule({
  declarations: [
    AppComponent,
    GroupViewComponent,
    MainPageComponent,
    GroupDetailsComponent,
    AddGameDialogComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NotFoundComponent,
    LogoutComponent,
    MainPageViewComponent,
    YourGroupsComponent,
    NavBarComponent,
    UpdateDialogComponent,
    AddGroupDialogComponent,
    MainPageComponent,
    GameViewComponent,
    GameDetailsComponent,
    BalancedTeamsTableComponent,
    AddPlayerDialogComponent,
    AddPlayerDialogViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    ClipboardModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [
    AddGameDialogComponent,
    AddGroupDialogComponent,
    AddPlayerDialogComponent,
    AddPlayerDialogViewComponent
  ]
})
export class AppModule { }
