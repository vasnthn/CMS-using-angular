import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { DisplayComponent } from './display/display.component';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageContentComponent } from './manage-content/manage-content.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AboutusComponent } from './aboutus/aboutus.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    UserDashboardComponent,
    UserHeaderComponent,
    AppHomeComponent,
    AppHeaderComponent,
    DisplayComponent,
    UploadComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ManageContentComponent,
    ManageUsersComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    HttpClient,
    AuthService,
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
