import { HttpClient } from '@angular/common/http';
import { DeclarationListEmitMode } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private subject: BehaviorSubject<string>;
  public obs$: Observable<any>;
  private sub: BehaviorSubject<string>;
  public obser$: Observable<any>;
  public formData: any = {};
  public array: any = [];
  public index: any;
  public table = true;
  constructor(private http: HttpClient) {
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
    this.index = data;
  }
  delete(item: any) {
    return this.http.delete(`http://localhost:3000/details/${item}`);
  }
  postDetails(form: any) {
    return this.http.post('http://localhost:3000/details', form);
  }
  getDetails() {
    return this.http.get('http://localhost:3000/details');
  }
  detailsToEdit(val: any) {
    return this.http.get('http://localhost:3000/details', val);
  }
  put(id: any, value: any) {
    return this.http.put(`http://localhost:3000/details/${id}`, value);
  }
  getdynamic(){
    return this.http.get("http://localhost:3000/inputval");
  }

  signUpDetails(values:any){
    return this.http.post("http://localhost:3000/register",values);
  }
  getSignUpDetails(){
    return this.http.get("http://localhost:3000/register");
  }
}
