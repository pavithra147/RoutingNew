import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  isLoggedIn=false;
  login(){
   
    return this.isLoggedIn=true;
   
  }
  logOut(){
    return this.isLoggedIn=false
  }
  isAuthenticated(){
   return this.isLoggedIn;
  }
  
}
