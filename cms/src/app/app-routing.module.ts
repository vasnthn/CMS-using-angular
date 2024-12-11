import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageContentComponent } from './manage-content/manage-content.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UploadComponent } from './upload/upload.component';
import { DisplayComponent } from './display/display.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout.component';
import { UserGuard } from './guards/user-guard.guard';
import { AdminGuard  } from './guards/admin-guard.guard';
import { AboutusComponent } from './aboutus/aboutus.component';


const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate:[AdminGuard] },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate:[UserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-content', component: ManageContentComponent, canActivate:[AdminGuard]  },
  { path: 'manage-users', component: ManageUsersComponent, canActivate:[AdminGuard]  },
  { path: 'upload', component:UploadComponent },
  { path: 'display', component: DisplayComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'aboutus', component: AboutusComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
