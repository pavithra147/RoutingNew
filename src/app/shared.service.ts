import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../environments/environment';

import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public baseUrl=environment.apiUrl;
  public title=environment.title;
  private subject: BehaviorSubject<string>;
  public obs$: Observable<any>;
  private sub: BehaviorSubject<string>;

  public obser$: Observable<any>;
  public formData: any = {};
  public array: any = [];
  public index: any;
  public table = true;
  constructor(private http: HttpClient,private authService:AuthServiceService,private router:Router) {
    this.subject = new BehaviorSubject<string>('');
    this.obs$ = this.subject.asObservable();
    this.sub = new BehaviorSubject<string>('');
    this.obser$ = this.subject.asObservable();
  }

  sendData(data: any) {
    this.array.push(data);
    this.subject.next(this.array);
    
  }
  editData(index: any, data: any) {
    this.array[index] = data;
  }
  get() {
    return this.array;
  }
  edit(data: any) {
   console.log(`${this.baseUrl}`);
   
    
    this.index = data;
  }
  delete(item: any) {
    
    return this.http.delete(`${this.baseUrl}/details/${item}`);
  }
  postDetails(form: any) {
    return this.http.post(`${this.baseUrl}/details`, form);
  }
  getDetails() {
    return this.http.get(`${this.baseUrl}/details`);
  }
  detailsToEdit(val: any) {
    return this.http.get(`${this.baseUrl}/details`, val);
  }
  put(id: any, value: any) {
    return this.http.put(`${this.baseUrl}/details/${id}`, value);
  }
  getdynamic(){
    return this.http.get(`${this.baseUrl}/inputval`);
  }

  signUpDetails(values:any){
    return this.http.post(`${this.baseUrl}/register`,values);
  }
  getSignUpDetails(){
    return this.http.get(`${this.baseUrl}/register`);
  }
  public detail:any;
  getLogin(){
    const detail=sessionStorage.getItem('name');
    return detail;
    
  }
  public show=false;
  logOut(){
    this.authService.logOut();
    this.show=!this.show;
    sessionStorage.clear();
    this.router.navigate(['/login'])
    console.log("logout",this.authService.isLoggedIn);
    
    

  }
 
}
