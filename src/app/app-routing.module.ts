import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  {path:'',redirectTo:'details',pathMatch:'full'},
  {path:'details',component:DetailsComponent},
  {path:'display/:name/:age/:address/:phoneNo/:location',component:DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
