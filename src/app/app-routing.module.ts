import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardServiceService } from './auth-guard-service.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { DisplayComponent } from './display/display.component';
import { LoggedinService } from './loggedin.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'details',component:DetailsComponent,canActivate:[AuthGuardServiceService]},
  {path:'detail/:data',component:DetailsComponent,canActivate:[AuthGuardServiceService]},
  {path:'display',component:DisplayComponent,canActivate:[LoggedinService]},
  {path:'login',component:LoginComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'dashboard',component:DashboardComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
