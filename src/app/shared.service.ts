import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   private subject:BehaviorSubject<string>
   public obs$:Observable<any>
   private sub:BehaviorSubject<string>
   public obser$:Observable<any>
   public formData:any={}
   public array:any=[];
  constructor() {
    this.subject=new BehaviorSubject<string>('');
    this.obs$=this.subject.asObservable();
    this.sub=new BehaviorSubject<string>('');
    this.obser$=this.subject.asObservable();
   }

   sendData(data:any){
    this.array.push(data);
    console.log(this.array)
      this.subject.next(this.array);

   }
  // get(){
  //   // this.sub.next(res);
  //   return this.array
  // }

 
}
