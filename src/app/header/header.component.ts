import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public name: any;
  public admin = false;
  public photo:any;
  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    this.loginDetails();
    this.check();
    this.image();
  }

  check() {
    const role = sessionStorage.getItem('role');
    if (role == 'Admin') {
      this.admin = true;
    }
  }

  loginDetails() {
    this.name = this.sharedService.getLogin();
    console.log(this.name);
  }

  logOut() {
    this.sharedService.logOut();
  }

  show=false;
  image(){
    this.photo= sessionStorage.getItem('image');
    if(sessionStorage.getItem('image')!= "undefined"){
       this.photo= sessionStorage.getItem('image');
    }
    else if(sessionStorage.getItem('image') == "undefined"){
       this.photo="assets/profile icon.png"
    }

    
  }

}
