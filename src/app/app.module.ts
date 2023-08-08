import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { DisplayComponent } from './display/display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortPipe } from './sort.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChartsModule} from 'ng2-charts';
import { PiechartComponent } from './piechart/piechart.component'
import { AuthInterceptor } from './interceptors/authInterceptors';
import { SendHeaderComponent } from './send-header/send-header.component';
import { ChatComponentComponent } from './chat-component/chat-component.component';
import { MessageComponent } from './message/message.component';


 @NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    DisplayComponent,
    TableComponent,
    SortPipe,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    DashboardComponent,
    PiechartComponent,
    SendHeaderComponent,
    ChatComponentComponent,
    MessageComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
   NgxPaginationModule,
   FormsModule,
   Ng2SearchPipeModule,
   ChartsModule
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
