import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  {path:'',redirectTo:'display',pathMatch:'full'},
  {path:'details',component:DetailsComponent},
  {path:'detail/:data',component:DetailsComponent},
  {path:'display',component:DisplayComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
